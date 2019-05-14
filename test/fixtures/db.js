const { users } = require('./users');
const candidates = require('./candidates');

const User = require('../../server/models/user');
const Candidate = require('../../server/models/candidate');


const setupDatabase = async () => {
    await User.deleteMany();
    await Candidate.deleteMany();

    await new User(users[0]).save();
    await new User(users[1]).save();
    await new User(users[2]).save();

    await new Candidate(candidates[0]).save();
    await new Candidate(candidates[1]).save();
};

module.exports = setupDatabase;
