const app = require('../server/app');
const expect = require('expect');
const { ObjectID } = require('mongodb');
const request = require('supertest');

const Endorser = require('../server/models/endorser');
const endorsers = require('./fixtures/endorsers');
const setupDatabase = require('./fixtures/db');
const { tokens } = require('./fixtures/users');

beforeEach(setupDatabase);

describe('GET /endorsers', () => {
    // Rework when districts added to prevent DDOS.
    it('should return a list of all endorsers when no params provided', async () => {

        const res = await request(app)
            .get('/endorsers')
            .expect(200);
        expect(res.body.endorsers.length).toBe(2);
        expect(res.body.endorsersCount).toBe(2);
    });
});

describe('GET /endorsers/:id', () => {
    it('should return endorser by id', async () => {
        const endorser = endorsers[0];
        
        const res = await request(app)
            .get(`/endorsers/${endorser._id}`)
            .expect(200);
        expect(res.body.endorser._id).toBe(endorser._id.toHexString());
        expect(res.body.endorser.name).toBe(endorser.name);
        // TODO: Add endorsementCount
    });

    it('should return 400 if incorrect ID requested', async () => {
        const endorser = endorsers[0];

        await request(app)
            .get(`/endorsers/${endorser._id}1`)
            .expect(400);
    });

    it('should return 404 if endorser not found', async () => {
        const endorser = new ObjectID().toString();

        await request(app)
            .get(`/endorsers/${endorser}`)
            .expect(404);
    });
});

describe('POST /endorsers', () => {
    it('should create endorser if user is authorized', async () => {
        const endorser = {
            name: 'The Mint',
            url: 'https://themint.com',
            sortOrder: '03'
        };
        const token = tokens[0];

        const res = await request(app)
            .post('/endorsers')
            .set('Authorization', `Bearer ${token}`)
            .send(endorser)
            .expect(201);
        expect(res.body.endorser.name).toBe(endorser.name);
        expect(res.body.endorser.url).toBe(endorser.url);
        expect(res.body.endorser.sortOrder).toEqual(Number(endorser.sortOrder));

        const newEndorser = await Endorser.findById(res.body.endorser._id);
        expect(newEndorser).toBeTruthy();
        expect(newEndorser.name).toBe(endorser.name);
    });

    it('should not create endorser if user unauthorized', async () => {
        const endorser = {
            name: 'The Mint',
            url: 'https://themint.com',
            sortOrder: '03'
        };

        const res = await request(app)
            .post('/endorsers')
            .send(endorser)
            .expect(401);
    });

    it('should not create endorser if correct fields not supplied', async () => {
        const endorser = {
            name: 'The Mint',
            random: 'random'
        };
        const token = tokens[0];
        
        const res = await request(app)
            .post('/endorsers')
            .set('Authorization', `Bearer ${token}`)
            .send({'random': 'field'})
            .expect(400);
        expect(res.body.error).toBe('Invalid Fields Submitted.')
    });
});

describe('PATCH /endorsers/:id', () => {
    it('should update endorser data if authorized', async () => {
        const token = tokens[0];
        const endorser = endorsers[0];
        const body = {name: 'The Mint'};

        const res = await request(app)
            .patch(`/endorsers/${endorser._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.endorser.name).toBe(body.name);

        const updatedEndorser = await Endorser.findById(res.body.endorser._id);
        expect(updatedEndorser.name).toBe(body.name);
    });

    it('should not update endorser data if unauthorized', async () => {
        const endorser = endorsers[0];
        const body = {name: 'The Mint'};

        const res = await request(app)
            .patch(`/endorsers/${endorser._id}`)
            .send(body)
            .expect(401);
        
        const updatedEndorser = await Endorser.findById(endorser._id);
        expect(updatedEndorser.name).toBe(endorser.name);
    });

    it('should return 400 with corrupted ID', async () => {
        const token = tokens[0];
        const hexID = new ObjectID().toString();

        await request(app)
            .patch(`/endorsers/${hexID}1`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });

    it('should return 400 with invalid ID', async () => {
        const token = tokens[0];
        const hexID = new ObjectID().toString();

        await request(app)
            .patch(`/endorsers/${hexID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });

    it('should return 400 with invalid body data', async () => {
        const endorser = endorsers[0];
        const token = tokens[0];
        const body = {random: 'field'};
        
        const res = await request(app)
            .patch(`/endorsers/${endorser._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400);
        
        expect(res.body.error).toBe('Invalid Fields Submitted.');
    });
});

describe('DELETE /endorsers/:id', () => {
    it('should delete endorser if admin', async () => {
        const token = tokens[2];
        const endorser = endorsers[0];

        await request(app)
            .delete(`/endorsers/${endorser._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        
        const endorserDB = await Endorser.find();
        expect(endorserDB.length).toBe(1);
    });

    it('should not delete endorser if not admin', async () => {
        const token = tokens[0];
        const endorser = endorsers[0];

        await request(app)
            .delete(`/endorsers/${endorser._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401);
        
        const endorserDB = await Endorser.find();
        expect(endorserDB.length).toBe(2);
    });
});