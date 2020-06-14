const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  username: Joi.string().min(7).max(255).required(),
  email: Joi.string().min(7).max(255).required().email(),
  password: Joi.string().min(7).max(255).required(),
});

const User = require("../models/User");

const userLogin = (req, res) => {};

const userLogout = (req, res) => {};

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  const { error } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email });
  if (user) {
    res
      .status(400)
      .json({ message: "That email already exists in our system" });
  } else {
    user = new User({
      username,
      email,
      password,
    });
  }

  try {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

module.exports = {
  userLogin,
  userLogout,
  userRegister,
};
