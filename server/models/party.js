const mongoose = require('mongoose');

const Candidate = require('./candidate');

const PartySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
});

PartySchema.virtual('candidates', {
    ref: 'Candidate',
    localField: '_id',
    foreignField: 'party'
})

let Party = new mongoose.model('Party', PartySchema);

module.exports = Party;