var express = require("express");
var router = express.Router();

const DietController = require('../controllers/user-diet-plan');
router.post("/", DietController.diet_create_diet  );


module.exports = router;