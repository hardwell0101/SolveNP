# AI Q&A Application

## Overview

This project is a full-stack AI-powered Question and Answer application, consisting of a React frontend and a FastAPI backend. It utilizes OpenAI's GPT model for generating answers and Firebase for user authentication. The application is deployed on AWS Lightsail, providing a scalable and cost-effective hosting solution.

## Project Structure

The project is organized into two main directories:

- [Frontend](frontend/README.md): Contains the React-based web application. Refer to the frontend README for detailed information on setting up, running, and contributing to the frontend.
- [Backend](backend/README.md): Contains the FastAPI-based API service. Refer to the backend README for detailed information on setting up, running, and contributing to the backend.

## Deployment

### Prerequisites

- AWS Lightsail account
- Docker and Docker Compose installed on your local machine
- OpenAI API key
- Firebase Admin SDK JSON file

### AWS Lightsail Setup

1. Create a new Lightsail instance with Ubuntu OS.
2. Configure the instance to allow inbound HTTP and HTTPS traffic.
3. Assign a static IP address to your instance for consistent access.

### Deployment Steps

1. SSH into your Lightsail instance.
2. Clone the project repository:
   ```
   git clone [your-repo-url]
   ```
3. Set the required environment variables:
   ```
   export OPENAI_API_KEY=your_openai_api_key
   export FIREBASE_ADMIN_SDK_PATH=/path/to/firebase-adminsdk.json
   ```
4. Install Docker and Docker Compose on the instance if not already installed.
5. Navigate to the project root directory.
6. Build and run the Docker containers:
   ```
   docker-compose up -d --build
   ```

The frontend Nginx configuration is set up to proxy requests to the backend API:

```
nginx:frontend/nginx.conf
```

### Continuous Deployment with GitHub Actions

The project includes a GitHub Actions workflow for continuous deployment. Whenever changes are pushed to the `main` branch, the workflow automatically deploys the latest code to the Lightsail instance, ensuring that the application stays up to date.

## Local Development

To set up the project for local development, follow the instructions in the respective README files for the frontend and backend. Each directory contains detailed steps for installing dependencies, running the application locally, and contributing to the codebase.

## Contributing

Contributions to the project are welcome! If you'd like to contribute, please follow the guidelines outlined in the frontend and backend README files. Be sure to adhere to the project's coding standards and submit pull requests for review.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as permitted by the license.

For any further questions or inquiries, please contact the project maintainers.
