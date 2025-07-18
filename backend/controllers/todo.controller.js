import mongoose from "mongoose";
import Todo from "../models/todo.model.js"

export const getTodos = async (req, res) => {
    try {
      const todos = await Todo.find({});
      res.status(200).json({success:true, data:todos})
    } catch (error) {
      console.log("Error in fetching todos:", error.message);
      res.status(500).json({success:false, message:"Server Error"});
    }
};

export const createTodo = async (req, res) => {
  const todo = req.body; //user will send this data

  if (!todo.name) {
    return res.status(400).json({success:false, message:"Please provide a name"});
  }

  const newTodo = new Todo(todo)

  try{
    await newTodo.save();
    res.status(201).json({success: true, data: newTodo});
  } catch (error) {
    console.error("Error in creating todo:", error.message);
    res.status(500).json({success:false, message:"Server Error"});
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const todoData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: "Invalid Todo Id"});
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, todoData, {new: true});
    res.status(200).json({success: true, data: updatedTodo });
  } catch (error) {
    res.status(500).json({success: false, message: "Server Error"});
  }
};

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