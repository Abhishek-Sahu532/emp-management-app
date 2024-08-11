# Employee Management System

## Project Description

This project is a full-stack employee management system built with modern web technologies. The frontend is developed using Vite, React, Redux Toolkit, and Tailwind CSS, while the backend is powered by Express, MongoDB, and Mongoose. The system allows users to register, log in, manage employee details, and perform CRUD operations on employee data. Authentication is handled using JWT, and the project follows best practices for both frontend and backend development.

## Features

- **User Authentication**: Users can register, log in, and log out securely.
- **Employee Management**: Create, read, update, and delete employee details.
- **Authorization**: Routes are protected using JWT, ensuring only authenticated users can access certain functionalities.
- **Responsive Design**: The UI is responsive and user-friendly, built with Tailwind CSS and React.
- **State Management**: Redux Toolkit is used for efficient state management in the frontend.
- **Error Handling**: Comprehensive error handling on both frontend and backend.
- **Modular Architecture**: The project is designed with a modular structure, making it easy to maintain and extend.

## Tech Stack

### Frontend
- **Vite**: A fast build tool and development server.
- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A toolset for efficient Redux development.
- **React Router DOM**: For routing in React applications.
- **React Hook Form**: For managing forms in React.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Toastify**: To display notifications.

### Backend
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing employee data.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **JWT (jsonwebtoken)**: For authentication and securing routes.
- **Bcrypt**: For hashing passwords.
- **Dotenv**: To manage environment variables.
- **Mongoose Sequence**: To generate auto-incrementing sequence numbers.
- **Morgan**: HTTP request logger middleware.
- **Cookie-Parser**: To parse cookies in HTTP requests.
- **Crypto**: For handling encryption and decryption.



## Installation and Setup

### Prerequisites
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install 
   npm run dev


### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:    
   ```bash
   npm install
   npm run dev


## API Endpoints

### Authentication
- **POST `/sign-up`**: Register a new user.
- **POST `/sign-in`**: Login a user.
- **GET `/sign-out`**: Logout a user (protected route).

### User Management
- **GET `/current-user`**: Get details of the currently logged-in user (protected route).
- **GET `/emp-details`**: Get all employee details (protected route).
- **PUT `/update-emp-details/:employeeID`**: Update employee details by ID (protected route).
- **DELETE `/delete-emp-details/:employeeID`**: Delete employee details by ID (protected route).


## Environment Variables

Create a `.env` file in the backend directory and add the following environment variables:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT = 8000
CORS_ORIGIN=your_preferred_value
ACCESS_TOKEN_SECRET=your_preferred_value
ACCESS_TOKEN_EXPIRY=your_preferred_value
REFRESH_TOKEN_SECRET=your_preferred_value
REFRESH_TOKEN_EXPIRY =your_preferred_value
