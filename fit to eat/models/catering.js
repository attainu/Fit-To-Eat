
const mongoose = require('mongoose');

const cateringSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    pax: { type: Number, required: true },
    company: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type:String, required: true },
    message: { type: String, required: true },
    
});

module.exports = mongoose.model('Catering', cateringSchema);