const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "demo",
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Database not connected error", err);
});

db.once("open", () => {
  console.log("Database connected SuccessFully");
});

module.exports = db;
