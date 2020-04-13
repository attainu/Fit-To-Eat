const mongoose = require("mongoose");

const Cart = require("../models/cart");
const Product = require("../models/product");

exports.cart_create_cart =  (req,res,next) => {
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
            url: "http://localhost:4000/cart/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
 
};