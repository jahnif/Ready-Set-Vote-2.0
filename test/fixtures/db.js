const { users } = require('./users');
const candidates = require('./candidates');
const parties = require('./parties');

const User = require('../../server/models/user');
const Candidate = require('../../server/models/candidate');
const Party = require('../../server/models/party');


const setupDatabase = async () => {
    await User.deleteMany();
    await Candidate.deleteMany();
    await Party.deleteMany();

    await new User(users[0]).save();
    await new User(users[1]).save();
    await new User(users[2]).save();

    await new Party(parties[0]).save();
    await new Party(parties[1]).save();

    await new Candidate(candidates[0]).save();
    await new Candidate(candidates[1]).save();
};

module.exports = setupDatabase;
