import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";
import requireAuth from "../middleware/requireAuth.js"; 

const router = express.Router();

// ! Require Auth for all Todo routes
router.use(requireAuth);

// * GET all Todos
router.get("/", getTodos);

// * POST a new Todo
router.post('/', createTodo);

// * UPDATE a Todo
router.put("/:id", updateTodo);

// * DELETE a Todo
router.delete("/:id", deleteTodo);

export default router;