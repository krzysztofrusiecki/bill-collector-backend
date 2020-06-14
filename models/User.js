const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 7,
      max: 256,
    },
    email: {
      type: String,
      required: true,
      min: 7,
      max: 256,
    },
    password: {
      type: String,
      required: true,
      min: 7,
      max: 256,
    },
  },
  {
    versionKey: false, // set to false then it wont create in mongodb
  }
);

module.exports = mongoose.Model("User", userSchema);
