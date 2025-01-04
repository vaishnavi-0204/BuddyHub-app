const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // import jwt for token generation
const User = require("../models/User"); // import user model
const router = express.Router();

//Register

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }
   // create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({
      message: "user registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // req.body is request body
    // find the user by username 

    const user = await User.findOne({ username });
    if (!user){
      return res.status(404).json({
        message: "User not found ",
      });
    }
    // compare the rovided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // generate a jwt token 
    const token = jwt.sign(
      {
        id: user._id, // payload
      },
      process.env.JWT_SECRET, // secret key
      {
        expiresIn: "1h", // token expiration
      }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = router;
