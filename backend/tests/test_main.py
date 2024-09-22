import os
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from app.main import create_app

# Set the environment variable for testing
os.environ['TESTING'] = 'True'
os.environ['OPENAI_API_KEY'] = 'dummy_key_for_testing'

app = create_app()
client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the AI Q&A API"}

@patch('firebase_admin.auth.verify_id_token')
@patch('openai.ChatCompletion.create')
def test_ask_question(mock_openai, mock_verify_token):
    # Mock the Firebase token verification
    mock_verify_token.return_value = {'uid': 'test_user_id'}
    
    # Mock the OpenAI API response
    mock_response = MagicMock()
    mock_response.choices = [MagicMock(message={'content': 'Test answer'})]
    mock_openai.return_value = mock_response

    headers = {"Authorization": "Bearer fake_token"}
    response = client.post("/ask", json={"text": "What is the capital of USA?"}, headers=headers)
    
    assert response.status_code == 200
    assert "answer" in response.json()
    assert response.json()["answer"] == "Test answer"
