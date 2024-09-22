FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Add this line to print package versions
RUN pip freeze

# Add these lines to check the Firebase Admin SDK files
RUN ls -l /app/firebase-adminsdk.json || echo "firebase-adminsdk.json not found"
RUN ls -l /app/solvenp-firebase-adminsdk-sfyzm.json || echo "solvenp-firebase-adminsdk-sfyzm.json not found"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]