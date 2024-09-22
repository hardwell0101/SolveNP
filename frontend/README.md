# AI Q&A Frontend

## Overview

This is the frontend component of the AI Q&A application. It's a React-based web application that provides users with an intuitive interface to sign in, ask questions, and receive answers from a powerful AI model. The frontend boasts a modern, responsive design with a dynamic sidebar and interactive UI elements, ensuring a seamless user experience across various devices.

## Features

- User authentication:
  - Sign In: Users can sign in using their email and password or through Google Sign-In integration.
  - Sign Up: New users can create an account with their email and password.
  - Sign Out: Authenticated users can securely sign out of the application.
- Interactive chat interface:
  - Users can input their questions and receive answers from the AI model.
  - The chat interface displays a history of the conversation for easy reference.
- Dynamic sidebar:
  - The sidebar provides a preview of upcoming features, keeping users engaged and informed.
  - It adapts to different screen sizes, ensuring optimal visibility and usability.
- Error handling and display:
  - The application gracefully handles and displays errors, providing a smooth user experience.
  - An error boundary component is implemented to catch and handle React errors.
- Loading indicators:
  - Loading indicators are displayed during data fetching and processing, keeping users informed about the application's status.

## Project Structure

The frontend project is structured as follows:

- `src/App.js`: The main application component, responsible for routing and managing authentication state.
- `src/components/`:
  - `ChatInterface.js`: The core component for the Q&A functionality, including the question input form, answer display, sidebar, and sign-out functionality.
  - `SignIn.js`: The component for user sign-in, supporting email/password and Google sign-in options.
  - `SignUp.js`: The component for user registration, allowing new users to create an account.
  - `ErrorBoundary.js`: An error boundary component for catching and handling React errors gracefully.
- `src/styles/`: Contains CSS files for styling the application components.
- `src/assets/`: Holds images and icons used in the application.
- `src/firebase.js`: Contains the Firebase configuration and authentication functions.

## Setup and Installation

To set up the frontend locally, follow these steps:

1. Clone the repository:
   ```
   git clone [repository-url]
   ```
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the frontend root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   ```
5. Start the development server:
   ```
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

## Building for Production

To create a production-ready build of the frontend, run the following command:

```
npm run build
```

This will generate an optimized build in the `build` directory, ready for deployment.

## Docker

The frontend can be containerized using Docker. The Dockerfile is located at `frontend/Dockerfile`:

```dockerfile:frontend/Dockerfile
startLine: 1
endLine: 18
```

To build and run the Docker container, use the following commands:

```
docker build -t ai-qa-frontend .
docker run -p 3000:80 ai-qa-frontend
```

The frontend will be accessible at `http://localhost:3000`.

## Styling

The application uses custom CSS for styling, with the stylesheets located in:
- `src/App.css`
- `src/components/ChatInterface.css`
- `src/styles/SignIn.css`
- `src/styles/SignUp.css`

Feel free to modify these stylesheets to customize the application's appearance.

## Future Enhancements

The frontend includes a dynamic sidebar that previews upcoming features:
- AI Agents: Users will be able to interact with specialized AI agents for specific domains or tasks.
- Computational Complexity: The application will explore and showcase problems related to computational complexity.

Stay tuned for these exciting additions!

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

Please ensure that your code follows the project's coding conventions and is properly documented.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code in accordance with the terms of the license.

If you have any questions or encounter any issues, please feel free to reach out to the project maintainers.