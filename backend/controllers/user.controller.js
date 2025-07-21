import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
};

// * Login User
export const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.login(email, password);
    // Create a token
    const token = createToken(user._id);
    res.status(200).json({success:true, message:"Login User", email, token})
  } catch (error) {
    res.status(500).json({success:false, error: error.message});
  }
};

// * SignUp User
export const signupUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.signup(email, password);
    // Create a token
    const token = createToken(user._id);
    res.status(200).json({success:true, message:"SignUp User", email, token});
  } catch (error) {
    res.status(500).json({success:false, error: error.message});
  }
};