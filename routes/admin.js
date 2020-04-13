const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const router = express.Router();
var dotenv = require('dotenv');
dotenv.config();


const Admin = require("../models/admin")
router.use(cors())

router.post('/login', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Admin.findAll({ where: { email: email } }).then(admin => {
        if (admin.length < 1) {
            return res.status(401).json({ message: "User Doesn't Exist" });
        } else {
            const token = jwt.sign(req.body, process.env.SECRET_KEY, { expiresIn: 500000 });
            return res.status(200).json({ message: "Authentication successful", Token: token, Id: admin[0]._id })
        }

    })
})

    module.exports = router