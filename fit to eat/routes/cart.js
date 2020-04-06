

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Cart = require("../models/cart");
const Product = require("../models/product");
router.post("/", (req,res,next) => {
    const productId = req.body.productId;
    Product.findById(req.body.productId)
    .then(product => {
        if (!product) {
          return res.status(404).json({
            message: "Product not found"
          });
        }
        const cart = new Cart({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
        });
        return cart.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "added to cart",
          createdCart: {
            _id: result._id,
            product: result.productId,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:5000/order/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
 
});

module.exports = router;