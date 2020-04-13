const express = require("express");
const router = express.Router();


const CateringController = require('../controllers/catering') ;
const dotenv = require('dotenv');
dotenv.config();

router.post("/",CateringController.catering_create_catering);

module.exports = router;