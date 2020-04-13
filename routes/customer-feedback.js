const express = require('express');
const router = express.Router();

const Feedback = require("../models/customer-feedback")
const User = require("../models/users")
const auth=require('../middleware/auth')
const dotenv = require('dotenv');
dotenv.config();

router.post('/', auth , async (req, res, next)=> {
  try {
    const { rating, message, userId } = req.body
    const feedback = await Feedback.create({ rating, message, userId }, { include: [{model:User}] })
    res.status(200).json(feedback)
  }
  catch (err) {
    console.log(err);
    return res.status(400).send(err);
  };
})

module.exports = router;