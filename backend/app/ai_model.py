import openai
from fastapi import HTTPException

class AIModel:
    def __init__(self):
        pass  # We don't need to set the API key here anymore

    async def generate_answer(self, question: str, user_id: str = None) -> str:
        try:
            # You can use user_id for user-specific operations if needed
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": question}
                ],
                max_tokens=150
            )
            return response.choices[0].message['content'].strip()
        except openai.error.OpenAIError as e:
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")