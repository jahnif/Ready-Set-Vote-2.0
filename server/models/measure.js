const mongoose = require('mongoose');
const validator = require('validator');

const twoChoices = val => {
    return val.length === 2;
};

// TODO: Add District.

const MeasureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [String],
        validate: [twoChoices, 'Measures must have two and only two choices.']
    }
});

let Measure = new mongoose.model('Measure', MeasureSchema);

module.exports = Measure;