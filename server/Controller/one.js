const express = require("express");
const router = express.Router();
const userModel = require("../Model/userModel");

// get all data
router.get("/", async (req, res) => {
  const data = await userModel.find();
  res.send({ success: true, message: "get all data", data: getAllData });
});

// register data
router.post("/signup", async (req, res) => {
  const { name, email, password, phone, avatar } = req.body;
  // console.log(req.body);

  const postData = new userModel({
    name,
    email,
    password,
    phone,
    avatar,
  });

  await postData.save();
  res.send({
    success: true,
    message: "data registered successfully",
    data: postData,
  });
});

// sign-in data
router.post("/signin", async (req, res) => {
  const { name, password } = req.body;
  // console.log(req.body);

  const user = await userModel.findOne({ name });

  if (!user) {
    return res.status(401).json({ error: "Invalid username" });
  }

  if (password !== user.password) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const userData = {
    Name: user.name,
  };

  res.json({ userData: userData, message: "Authentication successful" });
});

// unique data
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const uniqId = await userModel.findById(id);
    res.send(uniqId);
  } catch (err) {
    res.send(err);
  }
});

// Update data
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, password, avatar } = req.body;
  // console.log(req.body);

  try {
    await userModel.findByIdAndUpdate(id, {
      name,
      email,
      phone,
      password,
      avatar,
    });
    res.send({
      success: true,
      message: "data updated successfully",
      data: updateData,
    });
  } catch (err) {
    res.send(err);
  }
});

// Delete data
router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("ID is required");
  }

  try {
    const userData = await userModel.findById(id);

    if (!userData) {
      return res.status(404).send("User data not found");
    }

    await userModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Data Deleted", data: userData });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
