const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 7,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 7,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 7,
      max: 255,
    },
  },
  {
    versionKey: false, // set to false then it wont create in mongodb
  }
);

module.exports = mongoose.model("User", userSchema);
