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


const setupDatabase = async () => {
    await Candidate.deleteMany();
    await Endorser.deleteMany();
    await Measure.deleteMany();
    await Party.deleteMany();
    await User.deleteMany();

    await new User(users[0]).save();
    await new User(users[1]).save();
    await new User(users[2]).save();

    await new Party(parties[0]).save();
    await new Party(parties[1]).save();

    await new Candidate(candidates[0]).save();
    await new Candidate(candidates[1]).save();

    await new Measure(measures[0]).save();
    await new Measure(measures[1]).save();

    await new Endorser(endorsers[0]).save();
    await new Endorser(endorsers[1]).save();
};

module.exports = setupDatabase;
