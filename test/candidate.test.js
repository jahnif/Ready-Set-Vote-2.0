const app = require('../server/app');
const expect = require('expect');
const { ObjectID } = require('mongodb');
const request = require('supertest');

const Candidate = require('../server/models/candidate');
const candidates = require('./fixtures/candidates');
const parties = require('./fixtures/parties');
const setupDatabase = require('./fixtures/db');
const { tokens } = require('./fixtures/users');

beforeEach(setupDatabase);

describe('GET /candidates/:id', () => {
    it('should return candidate by id', async () => {
        const candidate = candidates[0];

        const res = await request(app)
            .get(`/candidates/${candidate._id}`)
            .expect(200);
        expect(res.body.candidate._id).toBe(candidate._id.toString());
        expect(res.body.candidate.name).toBe(candidate.name);
        expect(res.body.candidate.party.name).toBe(parties[0].name);
    });

    it('should return 400 if incorrect ID requested', async () => {
        const candidate = candidates[0];

        await request(app)
            .get(`/candidates/${candidate._id}1`)
            .expect(400);
    });

    it('should return 404 if candidate not found', async () => {
        const candidate = new ObjectID().toString();

        await request(app)
            .get(`/candidates/${candidate}`)
            .expect(404);
    });
});

describe('POST /candidates', () => {
    const candidate = {
        name: 'Jane Smith',
        party: parties[0].name
    };
    const token = tokens[0];

    it('should create a candidate in existing party if user is authorized', async () => {
        const res = await request(app)
            .post('/candidates')
            .set('Authorization', `Bearer ${token}`)
            .send(candidate)
            .expect(201);
        expect(res.body.candidate.name).toBe(candidate.name);
        expect(res.body.candidate.party.name).toBe(candidate.party);

        const newCandidate = await Candidate.findById(res.body.candidate._id);
        expect(newCandidate).toBeTruthy();
        expect(newCandidate.name).toBe(candidate.name);
        expect(newCandidate.party.name).toBe(res.body.candidate.party.name);
        expect(newCandidate.party._id).toEqual(parties[0]._id);
    });

    it('should create candidate and add party if user is authorized', async () => {
        const candidateParty = {
            name: 'Louise Belcher',
            party: 'Star-Bellied Sneetches'
        };
        
        const res = await request(app)
            .post('/candidates')
            .set('Authorization', `Bearer ${token}`)
            .send(candidateParty)
            .expect(201);
        expect(res.body.candidate.name).toBe(candidateParty.name);
        expect(res.body.candidate.party.name).toBe(candidateParty.party);

        const newCandidate = await Candidate.findById(res.body.candidate._id);
        expect(newCandidate).toBeTruthy();
        expect(newCandidate.name).toBe(candidateParty.name);
        expect(newCandidate.party.name).toBe(res.body.candidate.party.name);
    });

    it('should return 400 error with incorrect email address', async () => {
        const candidateParty = {
            name: 'Louise Belcher',
            party: 'Star-Bellied Sneetches',
            email: 'wrong.address'
        };
        
        await request(app)
            .post('/candidates')
            .set('Authorization', `Bearer ${token}`)
            .send(candidateParty)
            .expect(400);
    });

    it('should return 400 error with incorrect url', async () => {
        const candidateParty = {
            name: 'Louise Belcher',
            party: 'Star-Bellied Sneetches',
            url: 'incorrectURL'
        };
        
        await request(app)
            .post('/candidates')
            .set('Authorization', `Bearer ${token}`)
            .send(candidateParty)
            .expect(400);
    });

    it('should return 400 error with incorrect phone number', async () => {
        const candidateParty = {
            name: 'Louise Belcher',
            party: 'Star-Bellied Sneetches',
            phone: '123123-32120211'
        };
        
        await request(app)
            .post('/candidates')
            .set('Authorization', `Bearer ${token}`)
            .send(candidateParty)
            .expect(400);
    });

    it('should not create candidate if user unauthorized', async () => {        
        await request(app)
            .post('/candidates')
            .send(candidate)
            .expect(401);
    });

    it('should not create candidate if correct fields not supplied', async () => {
        const res = await request(app)
            .post('/candidates')
            .set('Authorization', `Bearer ${token}`)
            .send({'random': 'field'})
            .expect(400);
        expect(res.body.error).toBe('Invalid Fields Submitted.')
    });
});

describe('PATCH /candidates/:id', () => {
    it('should update candidate data if authorized', async () => {
        const token = tokens[0];
        const candidate = candidates[0];
        const body = {name: 'Johannes Smythe'};

        const res = await request(app)
            .patch(`/candidates/${candidate._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.candidate.name).toBe(body.name);

        const updatedCandidate = await Candidate.findById(res.body.candidate._id);
        expect(updatedCandidate.name).toBe(body.name);
    });

    it('should update candidate party if authorized', async () => {
        const token = tokens[0];
        const candidate = candidates[0];
        const body = {party: 'Star-Bellied Sneetches'};

        const res = await request(app)
            .patch(`/candidates/${candidate._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.candidate.party.name).toBe(body.party);

        const updatedCandidate = await Candidate.findById(candidate._id);
        expect(updatedCandidate.party.name).toBe(res.body.candidate.party.name);
    });

    it('should not update candidate party if no change', async () => {
        const token = tokens[0];
        const candidate = candidates[0];
        const body = {
            party: parties[0].name
        };

        const res = await request(app)
            .patch(`/candidates/${candidate._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.candidate.party._id).toBe(parties[0]._id.toHexString());
    });

    it('should not update candidate data if unauthorized', async () => {
        const candidate = candidates[0];
        const body = {name: 'Johannes Smythe'};

        const res = await request(app)
            .patch(`/candidates/${candidate._id}`)
            .send(body)
            .expect(401);
        
        const updatedCandidate = await Candidate.findById(candidate._id);
        expect(updatedCandidate.name).toBe(candidate.name);
    });

    it('should return 400 with corrupted ID', async () => {
        const token = tokens[0];
        const hexID = new ObjectID().toString();

        await request(app)
            .patch(`/candidates/${hexID}1`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });

    it('should return 400 with invalid ID', async () => {
        const token = tokens[0];
        const hexID = new ObjectID().toString();

        await request(app)
            .patch(`/candidates/${hexID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });

    it('should return 400 with invalid body data', async () => {
        const candidate = candidates[0];
        const token = tokens[0];
        const body = {random: 'field'};
        
        const res = await request(app)
            .patch(`/candidates/${candidate._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400);
        
        expect(res.body.error).toBe('Invalid Fields Submitted.');
    });
});

describe('DELETE /candidates/:id', () => {
    it('should delete candidate if admin', async () => {
        const token = tokens[2];
        const candidate = candidates[0];

        await request(app)
            .delete(`/candidates/${candidate._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        
        const candidateDB = await Candidate.find();
        expect(candidateDB.length).toBe(1);
    });

    it('should not delete candidate if not admin', async () => {
        const token = tokens[0];
        const candidate = candidates[0];

        await request(app)
            .delete(`/candidates/${candidate._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401);
        
        const candidateDB = await Candidate.find();
        expect(candidateDB.length).toBe(2);
    });
});