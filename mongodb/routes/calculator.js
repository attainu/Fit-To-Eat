var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

var Calculator = require("../models/calorie-calculator");
const CalculatorController = require('../controllers/calorie-calculator');

router.post("/", CalculatorController.calculator_create_calculator  );

module.exports = router;