# AI Q&A Backend

## Overview

This is the backend component of the AI Q&A application. It's a FastAPI-based web service that handles user authentication, processes questions, and generates answers using OpenAI's GPT model. The backend is designed to work seamlessly with the frontend, providing a complete AI-powered question-answering system.

## Features

- User authentication: The backend integrates with Firebase for secure user authentication.
- Question processing and answer generation: It leverages OpenAI's GPT model to process user questions and generate accurate answers.
- Rate limiting: The backend includes rate limiting mechanisms to prevent abuse and ensure fair usage of the API.
- Error handling and logging: Comprehensive error handling and logging capabilities are implemented to aid in debugging and monitoring.
- CORS support: The backend is configured with CORS support to allow seamless integration with the frontend.
- Dockerization: The application is Dockerized for easy deployment and scalability.

## Project Structure

The backend project is structured as follows:

- `app/main.py`: The main FastAPI application file, containing the API endpoints and application configuration.
- `app/ai_model.py`: Handles the interaction with the OpenAI API for question processing and answer generation.
- `app/models.py`: Defines the Pydantic models used for request and response validation.
- `tests/`: Contains unit tests for the application, ensuring code quality and reliability.
- `Dockerfile`: Specifies the instructions for building a Docker container of the backend application.
- `requirements.txt`: Lists all the Python dependencies required by the backend.

## Setup and Installation

To set up the backend locally, follow these steps:

1. Clone the repository:
   ```
   git clone [repository-url]
   ```
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
4. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Set up the necessary environment variables:
   - Create a `.env` file in the backend root directory.
   - Add the following variables to the `.env` file:
     ```
     OPENAI_API_KEY=your_openai_api_key
     FIREBASE_ADMIN_SDK_PATH=/path/to/firebase-adminsdk.json
     ```
   - Replace `your_openai_api_key` with your actual OpenAI API key.
   - Replace `/path/to/firebase-adminsdk.json` with the path to your Firebase Admin SDK JSON file.
6. Start the development server:
   ```
   uvicorn app.main:app --reload
   ```
   The backend API will be accessible at `http://localhost:8000`.

## API Endpoints

The backend exposes the following API endpoints:

- `GET /`: The root endpoint, which returns a welcome message.
- `POST /ask`: The main endpoint for asking questions.
  - Requires authentication.
  - Accepts a JSON body with a `text` field containing the question.
  - Returns a JSON response with an `answer` field containing the AI-generated answer.

## Authentication

The backend uses Firebase for authentication. Ensure that you have set up a Firebase project and obtained the necessary credentials (Admin SDK JSON file) before running the application.

## Testing

The backend includes unit tests to ensure code quality and reliability. To run the tests, execute the following command:

```
pytest
```

Make sure to have the required dependencies installed before running the tests.

## Docker

The backend can be containerized using Docker for easy deployment and scalability. To build and run the Docker container, use the following commands:

```
docker build -t ai-qa-backend .
docker run -p 8000:8000 -e OPENAI_API_KEY=your_key -e FIREBASE_ADMIN_SDK_PATH=/app/firebase-adminsdk.json ai-qa-backend
```

Make sure to replace `your_key` with your actual OpenAI API key and provide the correct path to your Firebase Admin SDK JSON file.

## Key Components

### main.py

The `main.py` file contains the main FastAPI application. It includes:
- CORS configuration
- Rate limiting
- Authentication middleware
- Error handling

Here's a code snippet highlighting the key parts of `main.py`:

```python:backend/app/main.py
startLine: 71
endLine: 160
```

### ai_model.py

The `ai_model.py` file handles the interaction with the OpenAI API for question processing and answer generation. Here's a code snippet of the `AIModel` class:

```python:backend/app/ai_model.py
startLine: 1
endLine: 23
```

## Error Handling

The backend includes comprehensive error handling to gracefully handle various types of errors, such as:
- HTTP exceptions
- Validation errors
- General exceptions

Proper error responses and logging are implemented to aid in debugging and monitoring.

## Future Enhancements

Here are some potential future enhancements for the backend:

- Implement more advanced AI models to improve the quality and accuracy of generated answers.
- Add user-specific question history to provide a personalized experience.
- Implement caching mechanisms for frequently asked questions to improve performance.

Feel free to contribute to these enhancements or propose new ones!

## Contributing

Contributions to the project are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature:
   ```
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```
   git commit -m "Add your commit message"
   ```
4. Push the changes to your forked repository:
   ```
   git push origin feature/your-feature-name
   ```
5. Open a pull request on the main repository, describing your changes.

Please ensure that your code adheres to the project's coding conventions and includes appropriate tests and documentation.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code in accordance with the terms of the license.

If you have any questions or encounter any issues, please feel free to reach out to the project maintainers.