const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const doctorSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Please provide firstname "],
    },
    lastname: {
        type: String,
        required: [true, "Please provide lastname "],
    },
    gender: {
        type: String,
        required: [true, "Please provide gender "],
    },
    email: {
        type: String,
        default: Date.now,

    },
    position: {
        type: String,
        required: [true, "Please provide position "],

    },
    img_path: {
        type: String,

    },
    bio: {
        type: String
    },
    phone: {
        type: String,
        required: [true, "Please provide Phone Number "],

    },
    social_media: {
        insta_link: String,
        fb_link: String
    }
});

module.exports = mongoose.model('Doctor', doctorSchema)