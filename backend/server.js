// Import the Express module — a popular framework for building web apps with Node.js
import express from 'express';
// Import the 'dotenv' package — it loads environment variables from a .env file into process.env
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import todoRoutes from "./routes/todo.routes.js";

// Call the config() method to initialize dotenv
// This makes variables in your .env file available in your code (e.g., process.env.MY_SECRET)
dotenv.config();

// Create an Express application
const app = express();

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/todos", todoRoutes);

// Start the server and have it listen on port 3000
// Once the server is running, log a message in the console
app.listen(3000, () => {
  connectDB();
  console.log('Server started at http://localhost:3000');
});