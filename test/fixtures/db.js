// Fixtures
const candidates = require('./candidates');
const endorsers = require('./endorsers');
const measures = require('./measures');
const parties = require('./parties');
const { users } = require('./users');

// Models
const Candidate = require('../../server/models/candidate');
const Endorser = require('../../server/models/endorser');
const Measure = require('../../server/models/measure');
const Party = require('../../server/models/party');
const User = require('../../server/models/user');


const setupUsers = async () => {
    await User.deleteMany();

    await new User(users[0]).save();
    await new User(users[1]).save();
    await new User(users[2]).save();
}

const setupCandidates = async () => {
    await Candidate.deleteMany();
    await Party.deleteMany();

    await new Party(parties[0]).save();
    await new Party(parties[1]).save();

    await new Candidate(candidates[0]).save();
    await new Candidate(candidates[1]).save();
}

const setupEndorsers = async () => {
    await Endorser.deleteMany();

    await new Endorser(endorsers[0]).save();
    await new Endorser(endorsers[1]).save();
}

const setupMeasures = async () => {
    await Measure.deleteMany();

    await new Measure(measures[0]).save();
    await new Measure(measures[1]).save();
}

const setupParties = async () => {
    await Party.deleteMany();

    await new Party(parties[0]).save();
    await new Party(parties[1]).save();
}

const setupDatabase = async () => {
    await setupUsers()
    await setupParties()
    await Candidate.deleteMany()
    await new Candidate(candidates[0]).save()
    await new Candidate(candidates[1]).save()
    await setupEndorsers()
    await setupMeasures()
}

module.exports = { 
    setupDatabase,
    setupUsers, 
    setupCandidates, 
    setupEndorsers, 
    setupMeasures, 
    setupParties 
};
