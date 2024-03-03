const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  avatar: String,
  role: {
    type: String,
    enum: ["admin", "faculty", "student", "visitor"],
    default: "visitor",
  },
});

// Integrate passport-local-mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const userModel = mongoose.model("register_data", userSchema);

module.exports = userModel;
