# Smart Appointment Scheduler Backend

This is the backend API for the Smart Appointment Scheduler app, built with Node.js, Express, and MongoDB.

## Features
- User registration and login (JWT authentication)
- Appointment management (CRUD)
- MongoDB integration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the backend root with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000` by default. 