const app = require('../server/app');
const expect = require('expect');
const { ObjectID } = require('mongodb');
const request = require('supertest');

const Measure = require('../server/models/measure');
const measures = require('./fixtures/measures');
const setupDatabase = require('./fixtures/db');
const { tokens } = require('./fixtures/users');

beforeEach(setupDatabase);

describe('GET /measures', () => {
    it('should return a list of paginated measures (limit: 10, offset: 0) when no params provided', async () => {

        const res = await request(app)
            .get('/measures')
            .expect(200);
        expect(res.body.measures.length).toBe(2);
        expect(res.body.measuresCount).toBe(2);
        expect(res.body.limit).toBe(10);
        expect(res.body.offset).toBe(0);
    });
    
    it('should return a list of paginated measures when params provided', async () => {

        const res = await request(app)
            .get('/measures?limit=1&offset=1')
            .expect(200);
        expect(res.body.measures.length).toBe(1);
        expect(res.body.measuresCount).toBe(2);
        expect(res.body.measures[0].name).toBe(measures[1].name);
    });

    it('should return a list of sorted measures when params provided', async () => {

        const res = await request(app)
            .get('/measures?sortBy=title:desc')
            .expect(200);
        expect(res.body.measures.length).toBe(2);
        expect(res.body.measuresCount).toBe(2);
        expect(res.body.measures[0].name).toBe(measures[1].name);
    });
});

describe('GET /measures/:id', () => {
    it('should return measure by id', async () => {
        const measure = measures[0];

        const res = await request(app)
            .get(`/measures/${measure._id}`)
            .expect(200);
        expect(res.body.measure._id).toBe(measure._id.toString());
        expect(res.body.measure.title).toBe(measure.title);
    });

    it('should return 400 if incorrect ID requested', async () => {
        const measure = measures[0];

        await request(app)
            .get(`/measures/${measure._id}1`)
            .expect(400);
    });

    it('should return 404 if measure not found', async () => {
        const measure = new ObjectID().toString();

        await request(app)
            .get(`/measures/${measure}`)
            .expect(404);
    });
});

describe('POST /measures', () => {
    it('should create measure if user is authorized', async () => {
        const measure = {
            title: 'Jump Rope',
            description: 'Should we jump rope?',
            options: ['yes', 'no']
        };
        const token = tokens[0];

        const res = await request(app)
            .post('/measures')
            .set('Authorization', `Bearer ${token}`)
            .send(measure)
            .expect(201);
        expect(res.body.measure.title).toBe(measure.title);
        expect(res.body.measure.description).toBe(measure.description);
        expect(res.body.measure.options).toEqual(measure.options);

        const newMeasure = await Measure.findById(res.body.measure._id);
        expect(newMeasure).toBeTruthy();
        expect(newMeasure.title).toBe(measure.title);
    });

    it('should return 400 if incorrect number of options specified', async () => {
        const measure = {
            title: 'Jump Rope',
            description: 'Should we jump rope?',
            options: ['yes', 'no', 'maybe']
        };
        const token = tokens[0];

        const res = await request(app)
            .post('/measures')
            .set('Authorization', `Bearer ${token}`)
            .send(measure)
            .expect(400);
    });

    it('should not create measure if user unauthorized', async () => {
        const measure = {
            title: 'Jump Rope',
            description: 'Should we jump rope?',
            options: ['yes', 'no']
        };

        await request(app)
            .post('/measures')
            .send(measure)
            .expect(401);
    });

    it('should not create measure if correct fields not supplied', async () => {
        const measure = {
            title: 'Jump Rope',
            random: 'random'
        };
        const token = tokens[0];
        
        const res = await request(app)
            .post('/measures')
            .set('Authorization', `Bearer ${token}`)
            .send(measure)
            .expect(400);
        expect(res.body.error).toBe('Invalid Fields Submitted.')
    });
});

describe('PATCH /measures/:id', () => {
    it('should update measure data if authorized', async () => {
        const token = tokens[0];
        const measure = measures[0];
        const body = {title: 'Jump Rope'};

        const res = await request(app)
            .patch(`/measures/${measure._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.measure.name).toBe(body.name);

        const updatedMeasure = await Measure.findById(res.body.measure._id);
        expect(updatedMeasure.name).toBe(body.name);
    });

    it('should not update endorser data if unauthorized', async () => {
        const measure = measures[0];
        const body = {title: 'Jump Rope'};

        const res = await request(app)
            .patch(`/measures/${measure._id}`)
            .send(body)
            .expect(401);
        
        const updatedMeasure = await Measure.findById(measure._id);
        expect(updatedMeasure.name).toBe(measure.name);
    });

    it('should return 400 with corrupted ID', async () => {
        const token = tokens[0];
        const hexID = new ObjectID().toString();

        await request(app)
            .patch(`/measures/${hexID}1`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });

    it('should return 400 with invalid ID', async () => {
        const token = tokens[0];
        const hexID = new ObjectID().toString();

        await request(app)
            .patch(`/measures/${hexID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });

    it('should return 400 with invalid body data', async () => {
        const measure = measures[0];
        const token = tokens[0];
        const body = {random: 'field'};
        
        const res = await request(app)
            .patch(`/measures/${measure._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400);
        
        expect(res.body.error).toBe('Invalid Fields Submitted.');
    });
});

describe('DELETE /measures/:id', () => {
    it('should delete measure if admin', async () => {
        const token = tokens[2];
        const measure = measures[0];

        await request(app)
            .delete(`/measures/${measure._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        
        const measuresDB = await Measure.find();
        expect(measuresDB.length).toBe(1);
    });

    it('should not delete measure if not admin', async () => {
        const token = tokens[0];
        const measure = measures[0];

        await request(app)
            .delete(`/measures/${measure._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401);
        
        const measuresDB = await Measure.find();
        expect(measuresDB.length).toBe(2);
    });
});