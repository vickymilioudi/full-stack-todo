import mongoose from "mongoose";
import Todo from "../models/todo.model.js"

// * Get all Todos
export const getTodos = async (req, res) => {
    try {
      const userId = req.user._id; 
      const todos = await Todo.find( { userId } );
      res.status(200).json({success:true, data:todos})
    } catch (error) {
      console.log("Error in fetching todos:", error.message);
      res.status(500).json({success:false, message:"Server Error"});
    }
};

// * Create new Todo
export const createTodo = async (req, res) => {
  const userId = req.user._id;
  const todo = req.body;

  if (!todo.name) {
    return res.status(400).json({ success: false, message: "Please provide a name" });
  }

  const newTodo = new Todo({
    ...todo,
    userId: userId,
  });

  try {
    await newTodo.save();
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    console.error("Error in creating todo:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// * Update a Todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: "Invalid Todo Id"});
  }

  try {
    const updatedTodo = await Todo.findById(id);
    if (!updatedTodo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    updatedTodo.isComplete = !updatedTodo.isComplete;
    await updatedTodo.save();
    res.status(200).json({success: true,  message:"Todo updated", data: updatedTodo});
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({success: false, message: "Server Error"});
  }
};

// * Delete a Todo
export const deleteTodo = async (req, res) => {
  const {id} = req.params
  
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({success:true, message:"Todo deleted"});
  } catch (error) {
    console.log("Error in deleting todo:", error.message);
    res.status(404).json({success: false, message: "Todo not found"});
  }
};