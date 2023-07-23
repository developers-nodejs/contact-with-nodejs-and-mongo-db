const mongoose = require("mongoose")

// schema 
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    comment: String
});

//create model and export it
module.exports = mongoose.model('contact', contactSchema)