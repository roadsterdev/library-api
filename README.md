# Library Management API

This is a Node.js and TypeScript-based API for managing a library's collection of books and users. It allows users to browse, borrow, and return books, as well as manage their accounts. The API is built using Express.js, Mongoose, and MongoDB, with support for seeding initial data.

## Getting Started

These instructions will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites
- Node.js and npm
- MongoDB Atlas (or a local MongoDB instance)
- Git

## Installation

### 1. Clone the Repository:

```
git clone https://github.com/roadsterdev/library-management-api.git
cd library-management-api
```

### 2. Install Dependencies:

Install the required Node.js packages

```
npm install
```

### 3. Set Up Environment Variables:

Create a .env file in the root directory of your project and add the following environment variables:

```
DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
```

Replace `username`, `password`, `cluster`, and `dbname` with your actual MongoDB Atlas credentials and database name.



## Database Seeding
To seed the database with initial data:

```
npm run db:seed
```

## API Documentation

This project uses Swagger to provide interactive API documentation.

### Accessing the Documentation

Once the server is running, you can access the API documentation by navigating to:

```
http://localhost:3000/api-docs
```

The Swagger UI will allow you to interact with the API endpoints directly from your browser.

## Running the Application

To start the application in development mode:

```
npm start
```

This will run the server with Nodemon, which automatically restarts the server when file changes are detected.