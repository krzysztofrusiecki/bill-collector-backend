const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation.js");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email is wrong" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "password is wrong" });
  }

  // create a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.json({ accessToken: token });
};

const userLogout = (req, res) => {};

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "That email already exists in our system" });
  } else {
    user = new User({
      username,
      email,
      password,
    });
  }
  user.password = await bcrypt.hash(user.password, 10);
  const newUser = await user.save();
  return res.status(201).json({ _id: newUser._id });
};

module.exports = {
  userLogin,
  userLogout,
  userRegister,
};
