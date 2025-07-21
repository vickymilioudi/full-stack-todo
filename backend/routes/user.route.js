import express from "express";
import { loginUser, signupUser } from "../controllers/user.controller.js";

const router = express.Router();

// * Login Route
router.post('/login', loginUser);

// * SignUp Route
router.post('/signup', signupUser);


export default router;