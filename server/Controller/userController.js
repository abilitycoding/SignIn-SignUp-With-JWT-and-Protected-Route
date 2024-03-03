const express = require("express");
const router = express.Router();
const passport = require("../Config/passport-config");
const User = require("../Model/userModel");

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

  const user = await User.findOne({ name });
  // console.log(user);

  if (!user) {
    return res.status(401).json({ error: "invalid user" });
  }

  if (password !== user.password) {
    return res.status(401).json({ error: "invalid password" });
  }

  const userData = {
    name: user.name,
    password: user.password
  };

  res.send({ success: true, message: "sign-in successfully", data: userData });
};

//uniq data

exports.getUniqueData = async (req, res, next, next) => {
  const id = req.params.id;
  try {
    const uniqId = await User.findById(id);
    res.send(uniqId);
  } catch (error) {
    res.send(error);
  }
};

// update data
exports.updateUserData = async  (req, res, next) => {
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
