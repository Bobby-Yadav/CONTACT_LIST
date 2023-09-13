//mongoose is needed as we will use that lib
const mongoose = require('mongoose');

// creating Schema
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

/// collection to be called in db
const Contact = mongoose.model('Contact',contactSchema);

//export this contact
module.exports = Contact;