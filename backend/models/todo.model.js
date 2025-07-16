import mongoose from "mongoose";

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