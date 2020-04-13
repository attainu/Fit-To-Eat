const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth')
const User = require("../models/users")
const { order, userOrder } = require("../models/order")
const Product = require("../models/product")

router.post('/', auth, async(req, res) => {
    try {
        const newOrder = await order.create(req.body)
            // ,{include:[Product]})
        res.status(200).json(newOrder)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };
})

router.get('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const getOrder = await order.findOne({ where: { id } })
        res.status(200).json(getOrder)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };
})

router.get('/', auth, async (req, res, next) => {
    try {
        const allOrder = await order.findAll({
            include: [{ model: User }, { model: Product }
            ]
        })
        res.status(200).json(allOrder)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };
})

router.post("/link", auth,async (req, res) => {
    try {
        const { productId, userId } = req.body
        const user_order = await userOrder.create({ productId, userId })
        res.json(user_order)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };
})

module.exports = router;