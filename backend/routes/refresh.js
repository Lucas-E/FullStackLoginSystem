const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const User = require('../models/index').User
const jwt = require('jsonwebtoken')
require('dotenv').config()
const refreshController = require('../controllers/refreshController')

router.post('/', refreshController.handleRefresh)

module.exports = router