const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const Catering = require("../models/catering");

exports.catering_create_catering =  (req, res, next) => {
    const catering = new Catering({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      pax: req.body.pax,
      company: req.body.company,
      contact: req.body.contact,
      email: req.body.email,
      message: req.body.message,
      needmail: req.body.needmail
    });
    catering
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
           //message: "Created catering order successfully",
          createdCatering: {
            name: result.name,
            pax: result.pax,
            company: req.body.company,
            contact: req.body.contact,
            email: req.body.email,
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
        subject: 'testing',
        text: 'hi! it works'
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
  };