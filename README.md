# Full-Stack Login System

A full-stack login and registration application built with React, FastAPI, PostgreSQL, JWT authentication, and Google reCAPTCHA.

## Project Summary

This repository implements a modern authentication flow with:

- user registration
- secure login with JWT tokens
- protected backend route for authenticated users
- bot protection using Google reCAPTCHA
- frontend and backend integration via REST API
- session persistence using browser storage

The backend is written in Python using FastAPI and SQLAlchemy, while the frontend is a Vite-powered React application with React Router.

## Architecture

### Backend

- FastAPI web API
- SQLAlchemy ORM with PostgreSQL
- JWT token generation and validation
- bcrypt password hashing via Passlib
- Google reCAPTCHA validation using the secret key
- CORS middleware configured for local development and deployed frontend
- Endpoints:
  - `GET /` - health check
  - `POST /register` - create a new user
  - `POST /login` - authenticate and issue JWT
  - `GET /me` - return the current authenticated user

### Frontend

- React + Vite
- React Router DOM for navigation
- `react-google-recaptcha` for client-side captcha challenge
- localStorage for storing the access token
- protected home experience after login
- logout button to clear token and reset session
- simple canvas-based Snake component displayed after login

## Key Features

- Password hashing with bcrypt
- JWT authentication with bearer token support
- reCAPTCHA token verification on login
- Protected `/me` route that validates the bearer token
- Login and register forms with backend API calls
- Persistent authentication state in localStorage
- Basic logout workflow in the frontend

## Environment Setup

### Backend

1. Open a terminal in the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file with the following values:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/db
   RECAPTCHA_SECRET=your_recaptcha_secret_key
   ```
4. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

> Note: the current `backend/security.py` implementation uses a hardcoded `SECRET_KEY = "super-secret-key"`. For production, replace it with a secure environment variable and avoid storing secrets in source code.

### Frontend

1. Open a terminal in the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the API base URL:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

- Visit `/register` to create a new user account.
- Visit `/login` to log in with email, password, and reCAPTCHA.
- After login, the application stores the JWT token in localStorage.
- The homepage sends the token to `/me` to verify the session and display the logged-in user.
- Click `Logout` to remove the token and return to the public home view.

## Deployment Notes

- CORS is configured in `backend/main.py` to allow `http://localhost:5173` and a deployed Vercel origin.
- The backend verifies reCAPTCHA responses using Google’s verification API.
- The frontend uses a public site key in `Login.jsx`.

## Author

- Icaro Santos

This project was created to practice full-stack authentication, API integration, and deployment-ready application flow.
