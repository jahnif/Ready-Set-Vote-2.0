const { ObjectID } = require('mongodb');

const candidateOneId = new ObjectID();
const candidateTwoId = new ObjectID();

const candidates = [{
    _id: candidateOneId,
    name: 'Dow Constantine',
    campaignAddress: '111 First Ave.',
    url: 'www.constantine4executive.com',
    email: 'dow.constantine@seattle.gov',
    phone: '206-666-9999'
},{
    _id: candidateTwoId,
    name: 'Susan Hutchinson',
    campaignAddress: '222 Second Ave',
    url: 'www.hutchinson4executive.com',
    email: 'susan@hutchinson.com',
    phone: '206-999-6666'
}]

module.exports = candidates