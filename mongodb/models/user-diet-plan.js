var mongoose = require('mongoose');

var dietSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    gender: { type: String, required: true },
    email:{type:String,required:true},
    age: { type: Number, required: true },
    message: { type: String },
    needmail:{type:Number,required:true,default:0}
});

module.exports = mongoose.model('Diet', dietSchema);