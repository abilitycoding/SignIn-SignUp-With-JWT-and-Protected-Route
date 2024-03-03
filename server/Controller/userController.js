const express = require("express");
const router = express.Router();
const passport = require("../Config/passport-config");
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const section = process.env.SECTION;

//get all data
exports.getAllData = async (req, res, next) => {
  const getAllData = await User.find();
  res.send(getAllData);
};

// sign-up
exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, phone, avatar, role } = req.body;

    // Use register method provided by passport-local-mongoose
    await User.register(
      new User({ name, email, phone, avatar, role }),
      password
    );

    res.send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

//sign-in
exports.signIn = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name }).lean();

    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    // Use a secure password comparison method (e.g., bcrypt) in a real-world scenario
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ user }, secretKey, {
      expiresIn: section // Token expiration time
    });

    // Include the token in the response
    const userData = {
      name: user.name
      // Add any other user data you want to include in the token payload
    };

    res.status(200).json({
      success: true,
      message: "Sign-in successfully",
      token,
      data: userData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//uniq data

exports.getUniqueData = async (req, res, next) => {
  const id = req.params.id;
  try {
    const uniqId = await User.findById(id);
    res.send(uniqId);
  } catch (error) {
    res.send(error);
  }
};

// update data
exports.updateUserData = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password, phone, avatar } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
      phone,
      avatar
    });

    res.send("data updated");
  } catch (err) {
    res.send(err);
  }
};

exports.deleteUserData = async (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  try {
    await User.findByIdAndDelete(id);

    res.send("data deleted");
  } catch (error) {
    res.send(error);
  }
};

module.exports = router;
