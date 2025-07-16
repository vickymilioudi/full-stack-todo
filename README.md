# MERN Crash Course ToDo List

A simple full-stack CRUD (Create, Read, Update, Delete) To-Do application built with the MERN stack: **MongoDB, Express, React, and Node.js**.

---
## Table of Contents

- [MERN Crash Course ToDo List](#mern-crash-course-todo-list)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Project Structure](#project-structure)
    - [How the components connect with each other](#how-the-components-connect-with-each-other)
  - [Installation \& Setup](#installation--setup)
    - [Backend Setup](#backend-setup)
  - [Database Structure](#database-structure)
    - [Mongoose Schema (`backend/models/Todo.js`):](#mongoose-schema-backendmodelstodojs)
  - [API Endpoints](#api-endpoints)
  - [Frontend](#frontend)

---

## Project Description

This project demonstrates a basic To-Do app where users can create, read, update, and delete tasks.  
The backend is powered by Node.js and Express, with data stored in MongoDB using Mongoose ODM.  
The frontend is planned to be developed with React (located in the `frontend/` folder).

---

## Project Structure

```
mern-crash-course/
│
├── backend/
│ ├── config/       # Contains files for MongoDB connection and configuration (e.g. db.js)
│ ├── controllers/  # Contains request handling logic (CRUD) for routes, e.g. create, read, update, delete tasks
│ ├── models/       # ontains Mongoose schemas/models defining the data structure in the database (e.g. Todo.js)
│ ├── routes/       # Contains files that define API endpoints and link requests to controllers
│ └── server.js     # Main backend entry file initializing Express app, connecting to DB, and loading routes
│
├── frontend/       # React frontend application (to be implemented)
│
├── .env            # Environment variables file
├── package.json    # Backend dependencies and scripts
└── README.md       # Project documentation
```

### How the components connect with each other

- The **server.js** loads the Express app, connects to MongoDB (via files in the `config/` folder), and imports the routes from the `routes/` folder.
- The **routes** receive HTTP requests (e.g. GET, POST) and forward them to the appropriate **controllers**.
- The **controllers** implement the logic for each action (e.g. creating, deleting a task) and use the **models** to interact with MongoDB.
- The **models** (Mongoose schemas) define the structure of documents in the database.
- The **frontend** (React app) will send HTTP requests to the backend API endpoints to display and manage tasks.
---

## Installation & Setup

### Backend Setup

1. Navigate to the backend folder and install dependencies:

```bash
cd mern-crash-course/backend
cls
npm init -y
cls
npm install express mongoose dotenv
cls
npm i nodemon -D
cls
npm run dev
```

2. Create a .env file in the backend/ directory with the following content:

```
MONGO_URI=your_mongodb_uri
```

3. Running the Project

Start the backend server in development mode (with nodemon):

```bash
npm run dev
```
---

## Database Structure

The application uses **MongoDB** as the database.  
Each To-Do item is stored as a document in a collection (e.g., `todos`).  
The schema is defined using **Mongoose** in the backend.

### Mongoose Schema (`backend/models/Todo.js`):

```js
// Define the schema for a To-Do item
const todoSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    default: false
  },
}, {timestamps: true}); // Automatically add 'createdAt' and 'updatedAt' fields

// Create the model for the 'todos' collection
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
```
**Schema Fields**

  * _id (`ObjectId`): Automatically generated unique identifier for each document by MongoDB.

  * name (`String`): The task description/title. This field is required.

  * isComplete (`Boolean`): Indicates if the task is completed. Defaults to false.

  * createdAt (`Date`): Timestamp automatically set when a document is created.

  * updatedAt (`Date`): Timestamp automatically updated when a document is modified.
---

## API Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/todos`     | Retrieve all todo items      |
| POST   | `/api/todos`     | Create a new todo item       |
| PUT    | `/api/todos/:id` | Update an existing todo item |
| DELETE | `/api/todos/:id` | Delete a todo item           |

## Frontend

The frontend React app is located in the frontend/ directory and is currently under development.
It will communicate with the backend API to display and manage todos interactively.