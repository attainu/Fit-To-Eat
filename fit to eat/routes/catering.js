const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Catering = require("../models/catering");

router.post("/",  (req, res, next) => {
  const catering = new Catering({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    pax: req.body.pax,
    company: req.body.company,
    contact: req.body.contact,
    email: req.body.email,
    message: req.body.message,
  });
catering
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created catering order successfully",
        createdCatering: {
            name: result.name,
            pax: result.pax,
            company: req.body.company,
            contact: req.body.contact,
            email: req.body.email,
            message: req.body.message,
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
});

module.exports = router;