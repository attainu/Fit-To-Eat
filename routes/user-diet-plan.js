const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth')
const dotenv = require('dotenv');
dotenv.config();

const Diet = require("../models/user-diet-plan")
const User = require("../models/users")

router.post('/', auth, async (req, res) => {
    try {
        const diet = await Diet.create(req.body, { include: [User] })
        res.status(200).json(diet)
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err);
    };

    if (req.body.needmail == "true") {
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
            subject: 'Diet Plan',
            text: 'WELCOME TO FIT-TO-EAT..!!! I HOPE BY FOLLOWING THIS CHART YOU WILL BE ABLE TO INCREASE YOUR STAMINA, AND ACHIEVE PROTEIN RICH DIET. ALSO, WE WILL SUGGEST TO HAVE A ONLINE SESSION WITH OUR DIETICIAN SO THAT YOU CAN PERSONALLY CUSTOMIZE YOUR DIET-CHART AS YOU NEEDED. ALSO, TILL LOCKDOWN 1 SESSION IS FREE FOR OUR USERS. KINDLY PREVAIL THIS OFFER. THANK YOU....!!!! VISIT AGAIN....!!!!  ',
            attachments:
                [
                    {

                        filename: 'adult-diet-chart.png',
                        path: '../pics/adult-diet-chart.png'
                    }
                ]
        }
        if (req.body.age >= 5 && req.body.age < 20) {
            mailOptions.attachments = [
                {
                    filename: 'diet11.jpg',
                    path: '../pics/diet11.jpg'
                }
            ]
        }
        else if (req.body.age >= 20 && req.body.age < 40) {
            mailOptions.attachments = [
                {
                    filename: 'adult-diet-chart.png',
                    path: '../pics/adult-diet-chart.png'
                }
            ]
        }
        else if (req.body.age >= 40 && req.body.age < 60) {
            mailOptions.attachments = [
                {
                    filename: 'diet12.jpg',
                    path: '../pics/diet12.jpg'
                }
            ]
        }
        else if (req.body.age >= 60 && req.body.age <= 80) {
            mailOptions.attachments = [
                {
                    filename: 'diet14.jpg',
                    path: '../pics/diet14.jpg'
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
    }
    else {
        console.log("email not sent")
    }


})

module.exports = router;