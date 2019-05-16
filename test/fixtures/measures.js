const { ObjectID } = require('mongodb');

const measureOneId = new ObjectID();
const measureTwoId = new ObjectID();

const measures = [{
    _id: measureOneId,
    title: 'Butter Eating',
    description: 'Shall toast be eaten butter or bread side up?',
    options: ['bread', 'butter']
}, {
    _id: measureTwoId,
    title: 'Trees',
    description: 'The Lorax wants to know if we should save the trees',
    options: ['yes', 'no']
}]

module.exports = measures;