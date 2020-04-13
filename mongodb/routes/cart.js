

const express = require("express");
const router = express.Router();


const CartController = require('../controllers/cart') ;

router.post("/",CartController.cart_create_cart);

module.exports = router;