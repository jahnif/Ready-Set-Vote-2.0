const mongoose = require('mongoose');
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate');

const EndorserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        trim: true,
        required: true,
        default: null,
        validate: {
            validator: url => url === null || validator.isURL(url.toString()),
            message: val => `Must be a valid Url`
        }
    },
    sortOrder: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        trim: true,
        default: null,
        validate: {
            validator: url => url === null || validator.isURL(url.toString()),
            message: val => `Must be a valid URL`
        }
    }
});

EndorserSchema.virtual('endorsedCandidates', {
    ref: 'Candidate',
    localField: '_id',
    foreignField: 'endorsements'
});

EndorserSchema.plugin(mongoosePaginate);

let Endorser = new mongoose.model('Endorser', EndorserSchema);

module.exports = Endorser;