const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('../../server/models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();
const userFourId = new ObjectID();

const tokens = [ 
    jwt.sign({_id: userOneId}, process.env.JWT_SECRET).toString(),
    jwt.sign({_id: userTwoId}, process.env.JWT_SECRET).toString(),
    jwt.sign({_id: userThreeId}, process.env.JWT_SECRET).toString()
]

const users = [{
    _id: userOneId,
    name: 'Dustin',
    email: 'dustin@example.com',
    password: 'hunter21'
}, {
    _id: userTwoId,
    name: 'Darryl',
    email: 'darryl.banks@example.com',
    password: 'notSecurePassword'
}, {
    _id: userThreeId,
    name: 'Joseph Peha',
    email: 'joseph.p@example.com',
    password: 'hellaSecure',
    admin: true,
}, {
    _id: userFourId,
    name: 'UserFour',
    email: 'four@example.com',
    password: 'alwaysSecure'
}];

const setupDatabase = async () => {
    await User.deleteMany();

    await new User(users[0]).save();
    await new User(users[1]).save();
    await new User(users[2]).save();
    await new User(users[3]).save();
};

module.exports = { users, tokens, setupDatabase };
