const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide username "],
    },
    email: {
        type: String,
        required: [true, "Please provide email "],
    },
    password: {
        type: String,
        required: [true, "Please provide password "],
    },
    role: {
        type: String,
        default: "doctor"
    },

});

module.exports = mongoose.model('User', userSchema)