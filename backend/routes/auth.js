const express = require("express");
const router = express.Router();
const User = require("../models/index").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = require('../controllers/authController')

require("dotenv").config();

router.post("/",authController.handleLogin );

module.exports = router;
