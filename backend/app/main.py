import os
import sys
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import openai
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import bleach
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import firebase_admin
from firebase_admin import credentials, auth
import logging
import json

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Question(BaseModel):
    text: str

async def verify_token(request: Request):
    token = request.headers.get('Authorization')
    if not token:
        raise HTTPException(status_code=401, detail="No token provided")
    try:
        token = token.split("Bearer ")[1]
        logger.info("Attempting to verify token")
        decoded_token = auth.verify_id_token(token)
        logger.info("Token verified successfully")
        return decoded_token
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid token format")
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        logger.error(f"Token verification failed: {str(e)}")
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")

def initialize_firebase():
    firebase_admin_sdk_paths = [
        '/app/firebase-adminsdk.json',
        '/app/solvenp-firebase-adminsdk-sfyzm.json'
    ]
    for path in firebase_admin_sdk_paths:
        logger.info(f"Attempting to initialize Firebase with SDK path: {path}")
        try:
            with open(path, 'r') as f:
                cred_dict = json.load(f)
            cred = credentials.Certificate(cred_dict)
            if not firebase_admin._apps:
                firebase_admin.initialize_app(cred)
                logger.info(f"Firebase Admin SDK initialized successfully with {path}")
                return
            else:
                logger.info("Firebase Admin SDK already initialized")
                return
        except FileNotFoundError:
            logger.warning(f"Firebase Admin SDK file not found at {path}")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase Admin SDK with {path}: {str(e)}")
    
    raise Exception("Failed to initialize Firebase Admin SDK with any of the provided paths")

def create_app():
    app = FastAPI()
    
    limiter = Limiter(key_func=get_remote_address)
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allows all origins
        allow_credentials=True,
        allow_methods=["*"],  # Allows all methods
        allow_headers=["*"],  # Allows all headers
    )

    @app.get("/")
    async def read_root():
        return {"message": "Welcome to the AI Q&A API"}

    @app.post("/ask")
    @limiter.limit("10/minute")
    async def ask_question(question: Question, request: Request, user_token: dict = Depends(verify_token)):
        logger.info(f"Received question: {question.text}")
        logger.info(f"Request headers: {request.headers}")
        try:
            user_id = user_token.get('uid')
            sanitized_question = bleach.clean(question.text)
            
            if not sanitized_question.strip():
                raise HTTPException(status_code=400, detail="Question cannot be empty")
            if len(sanitized_question) > 500:
                raise HTTPException(status_code=400, detail="Question is too long")
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": sanitized_question}
                ],
                max_tokens=150
            )
            if response.choices and len(response.choices) > 0 and hasattr(response.choices[0], 'message'):
                return {"answer": response.choices[0].message['content'].strip()}
            else:
                raise ValueError("Unexpected response structure from OpenAI API")
        except RateLimitExceeded:
            raise
        except HTTPException:
            raise
        except openai.error.OpenAIError as e:
            logger.error(f"OpenAI API error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
        except Exception as e:
            logger.error(f"Error in ask_question: {str(e)}")
            raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

    @app.options("/ask")
    async def options_ask():
        return JSONResponse(
            content={"message": "OK"},
            headers={
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "*",
            },
        )

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request, exc):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": str(exc.detail)}
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request, exc):
        return JSONResponse(
            status_code=422,
            content={"detail": str(exc)}
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request, exc):
        logger.error(f"Unhandled exception: {str(exc)}")
        return JSONResponse(
            status_code=500,
            content={"detail": "An unexpected error occurred"}
        )

    return app

try:
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key and os.getenv('TESTING') != 'True':
        raise ValueError("OPENAI_API_KEY is not set")

    initialize_firebase()
    app = create_app()
except Exception as e:
    logger.error(f"Error during startup: {str(e)}")
    if os.getenv('TESTING') != 'True':
        sys.exit(1)
