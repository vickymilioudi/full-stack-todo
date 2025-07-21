# MERN Crash Course ToDo List

A simple full-stack CRUD (Create, Read, Update, Delete) To-Do application built with the MERN stack: **MongoDB, Express, React, and Node.js**.

---
## Table of Contents

- [MERN Crash Course ToDo List](#mern-crash-course-todo-list)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Project Structure](#project-structure)
  - [Backend Structure](#backend-structure)
    - [How the components connect with each other](#how-the-components-connect-with-each-other)
    - [Backend Setup](#backend-setup)
    - [Database Structure](#database-structure)
      - [To-Do Schema (`backend/models/todo.model.js`):](#to-do-schema-backendmodelstodomodeljs)
        - [Schema Fields](#schema-fields)
      - [User Schema (`backend/models/.model.js`)](#user-schema-backendmodelsmodeljs)
        - [Schema Fields](#schema-fields-1)
    - [API Endpoints](#api-endpoints)
      - [To-Do Routes (`backend/routes/todo.route.js`)](#to-do-routes-backendroutestodoroutejs)
      - [User Routes (`backend/routes/user.route.js`)](#user-routes-backendroutesuserroutejs)
  - [Frontend](#frontend)
    - [Features](#features)
    - [Frontend Installation \& Setup](#frontend-installation--setup)
    - [Frontend Structure](#frontend-structure)
    - [⚙️ Core Functionality](#️-core-functionality)
      - [✅ Task Creation](#-task-creation)
      - [🔄 Completion Toggle](#-completion-toggle)
      - [🗑️ Deletion](#️-deletion)
      - [🔍 Live Search](#-live-search)
      - [📋 Filter by Incomplete](#-filter-by-incomplete)
      - [🔢 Sorting](#-sorting)

---

## Project Description

This project demonstrates a basic To-Do app where users can create, read, update, and delete tasks.  
The backend is powered by Node.js and Express, with data stored in MongoDB using Mongoose ODM.  
The frontend is planned to be developed with React (located in the `frontend/` folder).

---

## Project Structure

```
full-stack-todo/
│
├── backend/        # Backend (Node.js/Express/MongoDB) source code
├── frontend/       # React frontend application
│
├── .env            # Environment variables file
├── package.json    # Backend dependencies and scripts
└── README.md       # Project documentation
```

## Backend Structure

```
├── backend/
│ ├── config/       # Contains files for MongoDB connection and configuration (e.g. db.js)
│ ├── controllers/  # Contains request handling logic (CRUD) for routes, e.g. create, read, update, delete tasks
│ ├── models/       # Contains Mongoose schemas/models defining the data structure in the database (e.g. Todo.js)
│ ├── routes/       # Contains files that define API endpoints and link requests to controllers
│ └── server.js     # Main backend entry file initializing Express app, connecting to DB, and loading routes
```

### How the components connect with each other

- The **server.js** loads the Express app, connects to MongoDB (via files in the `config/` folder), and imports the routes from the `routes/` folder.
- The **routes** receive HTTP requests (e.g. GET, POST) and forward them to the appropriate **controllers**.
- The **controllers** implement the logic for each action (e.g. creating, deleting a task) and use the **models** to interact with MongoDB.
- The **models** (Mongoose schemas) define the structure of documents in the database.
- The **frontend** (React app) will send HTTP requests to the backend API endpoints to display and manage tasks.
---

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

### Database Structure

This application uses **MongoDB** for data storage and **Mongoose** as the ODM (Object Data Modeling) library to define schemas and interact with the database.

There are two main collections:
    * `todos` – Stores user to-do items
    * `users` – Stores registered user accounts

#### To-Do Schema (`backend/models/todo.model.js`):

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
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true}); // Automatically add 'createdAt' and 'updatedAt' fields

// Create the model for the 'todos' collection
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
```
##### Schema Fields

| Field | Type | Description                                        |
| ------------ | ---------- | ---------------------------------------- |
| `_id`        | `ObjectId` | Auto-generated unique identifier by MongoDB        |
| `name`       | `String`   | Task title/description (**required**)              |
| `isComplete` | `Boolean`  | Task status (defaults to `false`)                  |
| `user_id`    | `String`   | ID of the user who created the task (**required**) |
| `createdAt`  | `Date`     | Auto-generated timestamp on creation               |
| `updatedAt`  | `Date`     | Auto-updated timestamp on modification             |

---

#### User Schema (`backend/models/.model.js`)

```js
import mongoose from "mongoose";

// Define the schema for a user item
const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {timestamps: true}); // Automatically add 'createdAt' and 'updatedAt' fields

// Create the model for the 'users' collection
const User = mongoose.model("User", userSchema);

export default User;
```

##### Schema Fields

| Field | Type | Description |
| ----------- | ---------- | ----------------------------------------- |
| `_id`       | `ObjectId` | Auto-generated unique identifier by MongoDB      |
| `email`     | `String`   | User email address (must be unique and required) |
| `password`  | `String`   | Hashed password (required)                       |
| `createdAt` | `Date`     | Timestamp when the user was created              |
| `updatedAt` | `Date`     | Timestamp when the user data was last updated    |

--- 

### API Endpoints

The application's backend exposes RESTful API routes using Express. These are organized in two main route files:
* `todo.route.js` – Handles CRUD operations for to-do items
* `user.route.js` – Handles user authentication (login and signup)

#### To-Do Routes (`backend/routes/todo.route.js`)

This route file manages all operations related to To-Do items and is protected by authentication middleware. Only authenticated users can access these endpoints.

**Middleware**

  * `requireAuth`: Ensures the user is logged in before accessing any to-do route.

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/todos`     | Retrieve all todo items      |
| POST   | `/api/todos`     | Create a new todo item       |
| PUT    | `/api/todos/:id` | Update an existing todo item |
| DELETE | `/api/todos/:id` | Delete a todo item           |

#### User Routes (`backend/routes/user.route.js`)

This route file manages user login and registration. These routes are public and do not require authentication.

| Method | Path | Controller | Description |
| ------ | --------- | ------------ | ----------------------- |
| `POST` | `/login`  | `loginUser`  | Log in an existing user |
| `POST` | `/signup` | `signupUser` | Register a new user     |


## Frontend

The frontend is a React application located in the frontend/ directory. It provides an interactive user interface for managing todos and communicates with the backend API via HTTP requests.

---

### Features

  * ✅ Add, delete, and toggle todos
  * 🔍 Search todos by name
  * 📥 Filter to show only incomplete todos
  * 🔤 Sort todos alphabetically
  * 📅 Sort todos by creation date
  * ⛃ Global state management using Zustand
  * 🎯 Instant UI updates without refresh after each action

---


### Frontend Installation & Setup

To set up the frontend with React, Vite, and Tailwind CSS:

```bash
cd .\frontend\
npm create vite@latest .      # Create a React project using Vite
npm install
npm run dev
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

* Configure `tailwind.config.js`:
   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

*  Add Tailwind directives to your main CSS file (e.g., `src/index.css`):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
---

### Frontend Structure

```
frontend/
├── public/                   # Static files (index.html, favicon, etc.)
├── src/
│   ├── assets/              # Icons used in the UI
│   ├── components/          # Reusable React components (e.g. TodoItem, DeleteButton)
|   │   ├── DeleteButton.jsx
|   │   ├── ShowNotCompletedCheckbox.jsx
|   │   ├── SortByAlphabetButton.jsx
|   │   ├── SortByDateButton.jsx
|   │   ├── Todo.jsx        # Main Todo app component
│   │   ├── TodoItem.jsx    # Individual todo item with toggle/delete logic
|   │   ├── ToggleButton.jsx
│   ├── store/               # Global state management (e.g. Zustand store)
│   │   ├── todo.jsx         # Central store for todo CRUD operations
│   ├── App.jsx              # Main application wrapper
│   └── main.jsx             # Entry point for the React app
├── package.json             # Project metadata and dependencies
```
---


### ⚙️ Core Functionality

This frontend is built with **React** and uses **Zustand** for global state management. It communicates with a backend API (via RESTful endpoints) to handle todos efficiently, with **optimistic UI updates** and minimal re-rendering.

#### ✅ Task Creation
- Users can create a new task via a controlled text input.
- On submission, `createTodo` sends a `POST` request to `/api/todos`.
- The newly created todo is immediately reflected in the UI by updating the Zustand store (`todos` array).
- Local state is cleared after successful creation.

#### 🔄 Completion Toggle
- Each task includes a toggle switch that controls the `isComplete` status.
- `toggleTodo(pid)` performs a `PATCH` (or `POST`, depending on backend) to toggle the flag.
- Upon a successful response, Zustand updates only the modified task to avoid full list refresh.

#### 🗑️ Deletion
- A delete icon (wrapped in `DeleteButton`) triggers `deleteTodo(pid)`, sending a `DELETE` request to `/api/todos/:id`.
- The task is removed from the store (and UI) immediately after confirmation from the backend.
- Uses `Array.prototype.filter` in state update to exclude the deleted task.

#### 🔍 Live Search
- A dedicated `<input>` captures `searchText` using `useState`.
- `filteredTodos` is derived via:

  ```js
  todos.filter(todo => 
    todo.name.toLowerCase().includes(searchText.toLowerCase())
  )
- Real-time responsiveness ensures efficient user experience without extra network requests.

#### 📋 Filter by Incomplete

  - A checkbox component (ShowNotCompletedCheckbox) allows users to filter only not completed todos.
  - When checked, the visible list is derived from:

    ```js
    todos.filter(todo => !todo.isComplete)
    ```

  - It works in combination with the search filter for compound queries.

#### 🔢 Sorting

Two buttons allow dynamic client-side sorting:

  - Alphabetical:
    
    ```js
    todos.sort((a, b) => a.name.localeCompare(b.name));
    ```
    - Used when users want to group tasks alphabetically by name.

  - By Creation Date:

    ```js
    todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    ```
    - Useful for chronological task organization (e.g., most recent at bottom).
