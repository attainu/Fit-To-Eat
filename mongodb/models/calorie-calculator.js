var mongoose = require('mongoose');

var calculatorSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    gender: { type: String, required: true },
    activity: { type: String },
    email: { type: String, required: true }
});

module.exports = mongoose.model('Calculator', calculatorSchema);