const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const dotenv = require('dotenv');
dotenv.config();
const User = require("../models/users")
const Product = require("../models/product")

router.post('/', auth, async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id } })
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };
})

router.get('/', async (req, res, next) => {
    try {
        const product = await Product.findAll()
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };
})

module.exports = router;