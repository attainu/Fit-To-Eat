const express = require('express');
const router = express.Router();

const Calculator = require("../models/calorie-calculator")

router.post('/', async (req, res) => {
    try {
        const calculator = await Calculator.create(req.body)
        res.status(200).json(calc())
    }
    catch (err) {
        console.log(err);
            return res.status(400).send(err);
    };
    function calc() {
        let a = req.body.weightInKg
        let b = req.body.heightInCm
        let c = req.body.age
        if (req.body.gender == "male") {
            calorie = (66.5 + 13.8 * (a) + 5 * (b) / (6.8 * c))
        }
        else {
            calorie = (655.1 + 9.6 * (a) + 1.9 * (b) / (4.7 * c))
        }
        calorie = Math.floor(calorie)
        if (calorie < 900) {
            return ("HELLO USER YOUR CALORIE IS " + calorie + ". EXTREME WEIGHT LOSS. CONSULT DOCTOR IMMEDIATELY!");
        }
        else if ((calorie >= 900) && (calorie < 1350)) {
            return ("HELLO USER YOUR CALORIE IS " + calorie + " .WEIGHT LOSS. CONSULT DOCTOR IF WEIGHT DOESN'T INCREASES");
        }
        else if ((calorie >= 1350) && (calorie < 1650)) {
            return ("HELLO USER YOUR CALORIE IS " + calorie + " .MILD WEIGHT LOSS. EAT GOOD FOOD MORE");
        }
        else {
            return ("HELLO USER YOUR CALORIE IS " + calorie + " .EVERYTHING IS FINE. MAINTAIN YOUR WEIGHT");
        }
    }
})
module.exports = router;