const express = require("express");
const router = express.Router();
const User = require("../models/index").User;
const bcrypt = require("bcrypt");
const userController = require("../controllers/userControllers");
const handleJwt = require('../middlewares/checkJwt')

router.route("/").get(handleJwt, userController.getAllUsers).post(userController.postUser);

router.put("/:id", handleJwt, userController.updateUser);

router.delete("/:id", handleJwt, userController.deleteUser);

module.exports = router;
