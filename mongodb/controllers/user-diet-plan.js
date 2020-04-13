var mongoose = require("mongoose");
var nodemailer = require('nodemailer');

var Diet = require("../models/user-diet-plan");

const dotenv = require('dotenv');
dotenv.config();

exports.diet_create_diet = (req, res, next) => {
    const diet = new Diet({
        name: req.body.name,
        weight: req.body.weight,
        height: req.body.height,
        gender: req.body.gender,
        email:req.body.email,
        age: req.body.age,
        message: req.body.message,
        needmail: req.body.needmail
    });
    diet
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                // message:"diet chart ready"
                createdDietPlan: {
                    name: req.body.name,
                    weight: req.body.weight,
                    height: req.body.height,
                    gender: req.body.gender,
                    email:req.body.email,
                    age: req.body.age,
                    message: req.body.message,
                    needmail: req.body.needmail,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
       
    if (req.body.needmail == 1) {
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
            text: 'welcome to eat to fit ',
            // if(req.body.age >20)
            attachments:
            [
                {

                    filename:'adult-diet-chart.png',
                    path:'./adult-diet-chart.png'
                }
            ]
            
        }
        if(req.body.age >=20&&req.body.age<=45){
            mailOptions.attachments=[
                {
                    filename:'adult-diet-chart.png',
                    path:'./adult-diet-chart.png'
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
}