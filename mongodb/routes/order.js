const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

const OrderController = require('../controllers/order') ;

// Handle incoming GET requests to /orders
router.get("/", OrderController.order_get_all
);

router.post("/", OrderController.order_create_order);

router.get("/:orderId", OrderController.order_get_order);

router.delete("/:orderId", OrderController.order_delete_order);

module.exports = router;