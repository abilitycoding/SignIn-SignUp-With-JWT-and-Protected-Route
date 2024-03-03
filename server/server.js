const express = require("express");
const mongoose = require("./Config/db");
const session = require("express-session");
const passport = require("./Config/passport-config");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const PORT = process.env.PORT;

// Set up Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
  })
);

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

const UserController = require("./Controller/userController");

app.use("/", UserController);

app.listen(PORT, () => {
  console.log(`Server running on the port : ${PORT}`);
});
