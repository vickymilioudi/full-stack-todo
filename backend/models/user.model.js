import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

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

// ! Static SignUp Method
userSchema.statics.signup = async function(email, password) {
  // * Validation
  if (!email || !password ) {
    throw Error("All fields must be filled")
  }
  if (!validator.isEmail(email)){
    throw Error("Email is not valid")
  }
    if (!validator.isStrongPassword(password)){
    throw Error("Password not strong enough")
  }
  
  const exists = await this.findOne({ email });
  
  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// ! Static Login Method
userSchema.statics.login = async function(email, password) {
  // * Validation
  if (!email || !password ) {
    throw Error("All fields must be filled")
  }

   const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user
};

// Create the model for the 'users' collection
const User = mongoose.model("User", userSchema);

export default User;