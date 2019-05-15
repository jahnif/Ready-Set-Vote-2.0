const { ObjectID } = require('mongodb');

const partyOneId = new ObjectID();
const partyTwoId = new ObjectID();

const parties = [{
    _id: partyOneId,
    name: 'Yooks'
}, {
    _id: partyTwoId,
    name: 'Zooks'
}]

module.exports = parties