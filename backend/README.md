# Dinosaur API 🦖

A lightweight Node.js API that connects to a MongoDB database to fetch and serve dinosaur-related data. Built with Express and MongoDB, the API also supports CORS for cross-origin requests.

_This repository includes a mongoDBbackup.json file, which contains a backup copy of the database data. This is provided as a safeguard in case the original data is lost._

## Clone & Run locally

To install locally, clone the repo, navigate and the project folder using `cd /project name/`, then run npm install to install dependencies, and start the server using the scripts in package.json. Create a .env file to store your MongoDB connection string from MongoDB Atlas, and make sure to add .env to .gitignore to keep it secure.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB Atlas account

## API Endpoints

- GET /: Fetch all documents from the dinos collection in the MongoDB database.

## Project Structure

- `server.js`: The main server file that sets up the Express app, connects to MongoDB, and defines the API routes.
- `package.json`: Contains the project metadata and dependencies.

- `.env`: Contains environment variables, including the MongoDB connection string.
- `route.rest`: Contains example HTTP requests for testing the API.

## Technologies

- express: Fast, unopinionated, minimalist web framework for Node.js.
- mongodb: The official MongoDB driver for Node.js.
- dotenv: Loads environment variables from a .env file into process.env.

- cors: Middleware to enable CORS (Cross-Origin Resource Sharing).
- nodemon: A tool that helps develop Node.js applications by automatically restarting the node application when file changes in the directory are detected (development dependency).

**dependencies:**

- "cors": "^2.8.5",
- "dotenv": "^16.4.7",
- "express": "^4.21.2",
- "mongoose": "^8.9.5"

**devDependencies:**

- "nodemon": "^3.1.9"

## Environment Variables

the connection string in your .env file should look something like this and you can get it from mongo atlas. I am not putting my connection string publicly available

MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/database-name

---

## Deployment on Render

1. Create a render.yaml file in the root of your project, it should contain:

#filepath: render.yaml

services:

- type: web
  name: dino-api
  env: node
  plan: free
  buildCommand: npm install
  startCommand: npm start

2. Push your code to a Git repository

3. Create a new Web Service on Render:

- Go to Render.
- Click on "New" and select "Web Service".
- Connect your GitHub repository.
- Render will automatically detect the render.yaml file and configure the service.
- Set the environment variable MONGODB_URI with your MongoDB connection string in the Render dashboard.

4. Deploy the service:

- Render will build and deploy your service.
- Once deployed, your API will be accessible via the URL provided by Render.

---
