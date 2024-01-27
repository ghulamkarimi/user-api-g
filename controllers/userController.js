import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    const userExist = await User.findOne({ email });
  
    if (userExist) {
      return res.status(400).json("User already exists");
    }
  
    try {
      await User.create({ firstName, lastName, email, password });
      res.status(201).json("User created successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (userFound && (await userFound.isPasswordMatched(password))) {
    const { _id: userId, firstName, lastName, email } = userFound;
    
    const accessToken = jwt.sign(
      { userId, firstName, lastName, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { userId, firstName, lastName, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.findByIdAndUpdate(userId, { refreshToken: refreshToken });

    res.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout a user
// @route   DELETE /api/users/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token"); 
  res.status(200).json("User logged out successfully");
});
'Ä '