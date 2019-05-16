const { ObjectID } = require('mongodb');

const endorserOneId = new ObjectID();
const endorserTwoId = new ObjectID();

const endorsers = [{
    _id: endorserOneId,
    name: 'Seattle Picayune',
    url: 'www.seattlepicayune.com',
    sortOrder: '01',
    imageUrl: 's3.readysetvote/endorsers/images/seattlepicayune.jpg'
},{
    _id: endorserTwoId,
    name: 'Oregon Post',
    url: 'www.oregonpost.com',
    sortOrder: '02',
}];

module.exports = endorsers;