const express = require("express");
const router = express.Router();

const { userLogin, userRegister } = require("../controllers/Users");

// @desc    Login existing user
// @route   POST /users/login

router.post("/login", userLogin);

// @desc    Logout user
// @route   POST /users/logout

// router.post("/logout", userLogout);

// @desc    Register new user
// @route   POST /users/register

router.post("/register", userRegister);

module.exports = router;
