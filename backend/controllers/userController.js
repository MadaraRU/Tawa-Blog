import { validationResult } from 'express-validator';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

//Register
const register = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  //check if username or email exists
  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });

  if (usernameExists || emailExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//Login
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//update profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  // Check if the username has been changed and if it already exists in the database
  if (req.body.username !== user.username) {
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) {
      res.status(400);
      throw new Error('Username already exists');
    }
  }

  // Check if the email has been changed and if it already exists in the database
  if (req.body.email !== user.email) {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email already exists');
    }
  }

  user.username = req.body.username || user.username;
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
});

export { register, login, getUserProfile, updateUserProfile };
