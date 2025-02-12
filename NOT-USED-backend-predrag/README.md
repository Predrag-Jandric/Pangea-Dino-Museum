# Secondary Dinosaur API (not being used)

This is a simple Node.js API that connects to a MongoDB database and fetches data. The API is built using Express and MongoDB, and it supports CORS for cross-origin requests.

## Note ⚠️

- **This API was being used for this project initially but then, a different one was made by another team member (Greg) and it is in this repo being used as primary backend, while this one is NOT being used but it has been put here for the sake of being here and maybe needed in the future who knows. In that other backend which is primary, there are also more features not just fetch data from mongoDB. The other backend also has authentication and is using Supabase instead of mongoDB. We basically have 2 backends developed by two different team members but only one is being used, which is not this one.**

- **In here you will also find v5dinos.json which is just the copy of the data from the database. It is here in case original data gets lost or something. This same data is also used in the other, primary backend database.**

## Installation

git clone it locally, install packages with `npm i` then run using scripts found in package.json. You will need to create a local .env file where you will store your mongoDB connection string found in mongo Atlas website. Dont forget to add this .env to your .gitignore file

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
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `route.rest`: Contains example HTTP requests for testing the API.

## Dependencies

- express: Fast, unopinionated, minimalist web framework for Node.js.
- mongodb: The official MongoDB driver for Node.js.
- dotenv: Loads environment variables from a .env file into process.env.

- cors: Middleware to enable CORS (Cross-Origin Resource Sharing).
- nodemon: A tool that helps develop Node.js applications by automatically restarting the node application when file changes in the directory are detected (development dependency).

## Environment Variables

TO ADMIN: the connection string in your .env file should look something like this and you can get it from mongo atlas

MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/database-name

## Deployment

to deploy to render here are the steps, altho, I AM NOT SURE, IT MAY EVEN WORK WITHOUT render.yaml. There is a way on render to just put a link of the github repo.

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
