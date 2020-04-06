var express = require("express");
var router = express.Router();
var bcrypt = require('bcryptjs')
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
var User = require('../models/users')
dotenv.config();
router.post("/login", async (req, res) => {
    console.log("inside userjs", req.body.name)
    User.find({ name: req.body.name }, function (err, user) {
        console.log(user.length)
        if (err || (!user && user.length == 0)) {
            console.log("No User")
            return res.json({ status: 400, error: true, message: err })
        }
        try {
            if (req.body.password == user[0].password || bcrypt.compareSync(req.body.password, user[0].password)) {
                console.log("User Found")
                var accessToken = jwt.sign({ _id: user[0]._id }, process.env.secretKey, { expiresIn: '1 day' })
                res.json({ status: 200, access_token: accessToken })
            } else {
                console.log("Wrong Credentials")
                res.send("not allowed")
            }
        } catch{
            res.status(500).send("not found")
        }
    })
})



module.exports = router;