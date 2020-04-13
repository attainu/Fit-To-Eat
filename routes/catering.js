const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth=require('../middleware/auth')
const dotenv = require('dotenv');
dotenv.config();

const Catering = require("../models/catering")
const User = require("../models/users")

router.post('/', auth, async (req, res) => {
    try {
        const catering = await Catering.create(req.body, { include: [User] })
        res.status(200).json(catering)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CATERING_EMAIL,
            pass: process.env.CATERING_PASSWORD
        }
    })
    let mailOptions = {
        from: process.env.CATERING_EMAIL,
        to: req.body.email,
        subject: 'Replying query received for catering.',
        text: 'HI! WELCOME TO EAT TO -FIT. AS YOU THAUGHT OF A HEALTHY-FOOD PARTY/SEMINAR. WE ARE HERE TO HELP YOU. I AM PROVIDING YOU THE ESTIMATE WITH TOTAL PRICE. NO HIDDEN CHARGES. ALSO, IF YOU ARE LOOKING FOR SERVER IN THE PARTY KINDLY SHARE THE NUMBER OF PEOPLE YOU ARE LOOKING AND WE WILL ARRANGE THEM FOR YOU. CHARGES WILL BE EXTRA FOR THIS. DO GIVE A CALL ON THE NUMBER GIVEN IN THE ATTACHMENT TO CONFIRM BOOKING AND IF NEEDED THE SERVER. THANK YOU...!!!! VISIT AGAIN....!!!! ',
        attachments:
            [
                {

                    filename: 'party1.jpg',
                    path: '../pics/party1.jpg'
                }
            ]
    }
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("error occurs", err);
        }
        else {
            console.log("email sent")
        }
    });
});

module.exports = router;