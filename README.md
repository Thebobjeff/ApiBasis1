# Express API with MongoDB and JWT Authentication

This repository contains a Node.js Express API with MongoDB as the database and JWT (JSON Web Tokens) for authentication. The API includes features such as user authentication, token-based authorization, and middleware for securing routes.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building server-side applications.
- **Express.js**: Web application framework for Node.js, used for building APIs.
- **MongoDB**: NoSQL database used for storing data.
- **Mongoose**: MongoDB object modeling for Node.js, provides a straightforward schema-based solution to model application data.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWT).
- **bcrypt**: For hashing passwords securely.
- **Middleware**: Used for authentication purposes, including token verification.

## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Install dependencies:**

    ```bash
    cd <repository_directory>
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory of the project and add the following variables:

    ```
    PORT=3000
    MONGODB_URI=<mongodb_connection_string>
    JWT_SECRET=<jwt_secret_key>
    TOKEN_EXPIRATION=3600 # Token expiration time in seconds (1 hour)
    ```

    Replace `<mongodb_connection_string>` with your MongoDB connection string and `<jwt_secret_key>` with your preferred secret key for JWT.

4. **Run the server:**

    ```bash
    npm start
    ```

    The server should now be running on `http://localhost:3000`.

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login and generate JWT token.
- **GET /api/users**: Get all users (protected route).
- **GET /api/users/:id**: Get user by ID (protected route).
- **PUT /api/users/:id**: Update user by ID (protected route).
- **DELETE /api/users/:id**: Delete user by ID (protected route).

## Authentication

- Token-based authentication is implemented using JWT.
- Tokens expire after one hour (configurable).
- Middleware is used to authenticate routes using JWT.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
