
const express = require("express");
const router = express.Router();
var dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require('../models/user');
const UserController = require('../controllers/user');


router.post("/register",UserController.user_create_user);

router.post('/login',UserController.user_login_user);


module.exports = router;