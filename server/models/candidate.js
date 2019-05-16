const mongoose = require('mongoose');
const validator = require('validator');

// TODO: Add seat;

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
        required: false,
        default: null,
        validate: {
            validator: url => url === null || validator.isURL(url.toString()),
            message: val => `Must be a valid URL`
        }
    },
    email: {
        type: String,
        trim: true,
        default: null,
        validate: {
            validator: email => email === null || validator.isEmail(email.toString()),
            message: val => `${val.value} is not a valid email`
        }
    },
    phone: {
        type: String,
        trim: true,
        default: null,
        validate: {
            validator: phone => phone === null || validator.isMobilePhone(phone.toString(), 'en-US'),
            message: val => `${val.value} is not a valid phone number`
        }
    },
    party: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Party'
    }
});

const autoPopulateParty = function(next) {
    this.populate('party');
    next()
}

CandidateSchema
    .pre('find', autoPopulateParty)
    .pre('findById', autoPopulateParty)
    .pre('findOne', autoPopulateParty);

let Candidate = new mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;