# Confidential Diary App 📔🔒

## Overview ℹ️

This project is a secure online diary application that allows users to create and access their diary entries with the assurance that their data is encrypted and protected. The application is built using React for the frontend and Node.js with Express for the backend, with MySQL as the database.

## Features ✨

### Client Side 🖥️

- **User Registration**: Users can sign up by providing a username, password, and their diary entry. The password is hashed, and the diary entry is encrypted before being sent to the server.
- **User Login**: Users can log in with their username and password to access their encrypted diary entries.
- **Diary Management**: After logging in, users can view their decrypted diary entries.

### Server Side 🖥️

- **Database Connection**: Connects to a MySQL database to store user information securely.
- **Data Encryption and Decryption**: Uses AES-256-CBC encryption to secure diary entries and bcrypt to hash passwords.
- **Authentication**: Utilizes JWT (JSON Web Tokens) for user authentication.

## Technical Details 🔐

### Encryption Process 🔒

- **Message Encryption**: Uses AES-256-CBC encryption with a random initialization vector (IV) to encrypt diary entries before storing them in the database.
- **Password Hashing**: Passwords are hashed using bcrypt before being stored.

### Decryption Process 🔓

- **Message Decryption**: Decrypts the stored encrypted diary entries using the same AES-256-CBC method when the user accesses their diary.

## Setup and Installation ⚙️

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/Samah022/Confidential-Data-DB-App.git
    ```

2. **Install Dependencies**:

    - Client:

        ```sh
        cd client
        npm install
        ```

    - Server:

        ```sh
        cd server
        npm install
        ```

3. **Configure Environment Variables**:

    - Create a `.env` file in the server directory with the following variables:

        ```env
        PORT=3001
        HOST=your_database_host
        USER=your_database_user
        PASSWORD=your_database_password
        DATABASE=your_database_name
        SECRET=your_jwt_secret
        KEY=your_encryption_key
        ```

4. **Run the Application**:

    - Client:

        ```sh
        cd client
        npm start
        ```

    - Server:

        ```sh
        cd server
        node server.js
        ```
