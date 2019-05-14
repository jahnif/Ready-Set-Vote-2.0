const mongoose = require('mongoose');
const validator = require('validator');

const Party = require('./party');

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    url: {
        type: String,
        trim: true,
        default: null,
        validate: {
            validator: code => code === null || validator.isURL(code.toString()),
            message: val => `Must be a valid URL`
        }
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        default: null,
        validate: {
            validator: code => code === null || validator.isEmail(code.toString()),
            message: val => `${val.value} is not a valid email`
        }
    },
    phone: {
        type: String,
        trim: true,
        default: null,
        validate: {
            validator: code => code === null || validator.isMobilePhone(code.toString(), 'en-US'),
            message: val => `${val.value} is not a valid phone number`
        }
    }
});

let Candidate = new mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;