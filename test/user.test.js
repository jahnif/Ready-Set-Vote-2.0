const expect = require('expect');
const { ObjectID } = require('mongodb');
const request = require('supertest');

const app = require('../server/app');
const { setupUsers } = require('./fixtures/db');
const User = require('../server/models/user');
const { users, tokens } = require('./fixtures/users')

beforeAll(setupUsers);

describe('GET /api/users', () => {
    it('should return paginated user list (offset: 0, limit: 10) if admin', async () => {
        const token = tokens[2];

        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(res.body.userCount).toBe(users.length);
        expect(res.body.users.length).toBe(users.length);
        expect(res.body.limit).toBe(10);
        expect(res.body.offset).toBe(0);
    });

    it('should return paginated user list by params if admin', async () => {
        const token = tokens[2];

        const res = await request(app)
            .get('/api/users?offset=2&limit=1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(res.body.userCount).toBe(users.length);
        expect(res.body.users.length).toBe(1);
        expect(res.body.users[0].name).toBe(users[2].name);
        expect(res.body.limit).toBe(1);
        expect(res.body.offset).toBe(2);
    });

    it('should return 401 if not admin', async () => {
        await request(app)
            .get('/api/users')
            .expect(401);
    });
});

describe('POST /api/users', () => {
    
    it('should create a user', async () => {
        const email = 'example@example.com';
        const password = '1234password';
        const name = 'example';

        const res = await request(app)
            .post('/api/users')
            .send({name, email, password})
            .expect(201);
        
        const user = await User.findById(res.body.user._id);
        expect(user).toBeTruthy();
        expect(user.password).not.toBe(password);

        expect(res.body.token).toBeTruthy();
        expect(res.body.user._id).toBeTruthy();
        expect(res.body.user.name).toBe(name);
    });

    it('should return proper validation errors if request invalid', async () => {
        const email = 'dustin.com';
        const password = '';

        const res = await request(app)
            .post('/api/users')
            .send({email, password})
            .expect(400);
        
        const errors = res.body.errors;
        expect(errors.name).toBeTruthy();
        expect(errors.email).toBeTruthy();
        expect(errors.password).toBeTruthy();
    });

    it('should not create user if email already in database', async () => {
        await request(app)
            .post('/api/users')
            .send({email: users[0].email, password: 'password123'})
            .expect(400);
    });

    it('should return 400 and field error if user sends incorrect fields', async () => {
        const email = 'example@example.com';
        const password = 'valid_pw';
        const name = 'example';
        const randomField = 'junkData';

        const res = await request(app)
            .post('/api/users')
            .send({email, password, name, randomField})
            .expect(400);
        
        expect(res.body.error).toBe('Invalid Fields Submitted.');
    });
});

describe('GET /api/users/me', () => {
    it('should return user\'s account', async () => {
        const user = users[0];
        const token = tokens[0];

        const res = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(res.body.user._id).toBe(user._id.toString());
        expect(res.body.user.name).toBe(user.name);
    });
});

describe('GET /api/users/:id', () => {
    it('should return own user object', async () => {
        const user = users[0];
        const token = tokens[0];

        const res = await request(app)
            .get(`/api/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(res.body.user._id).toBe(user._id.toString());
        expect(res.body.user.name).toBe(user.name);
    });
    
    it('should return user object if Admin', async () => {
        const user = users[0];
        const admin = users[2];
        const token = tokens[2];

        const res = await request(app)
            .get(`/api/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(res.body.user._id).toBe(user._id.toString());
        expect(res.body.user.name).toBe(user.name);
    });

    it('should return 400 if incorrect userID requested', async () => {
        const user = users[0];
        const token = tokens[0];

        await request(app)
            .get(`/api/users/${user._id.toString()}1`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });

    it('should return 401 if not requesting self and not admin', async () => {
        const user = users[0];
        const token = tokens[0];
        const user2 = users[1];

        const res = await request(app)
            .get(`/api/users/${user2._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401);
    });
});

describe('PATCH /api/users/me', () => {
    it('should update user\'s own data with valid input', async () => {
        const token = tokens[0];
        const body = {name: 'Janet'};

        const res = await request(app)
            .patch('/api/users/me').set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.user.name).toBe(body.name);
    });

    it('should not update user\'s own data with invalid input', async () => {
        const token = tokens[0];
        const body = {random: 'Janet'};

        const res = await request(app)
            .patch('/api/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400);
        expect(res.body.error).toBe('Invalid Fields Submitted.');
    });
});

describe('PATCH /api/users/:id', () => {
    it('should update user\'s own data with valid input', async () => {
        const user = users[0];
        const token = tokens[0];
        const body = {name: 'Janet'};

        const res = await request(app)
            .patch(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.user.name).toBe(body.name);

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.name).toBe(body.name);
    });

    it('should not verify user if not Admin', async () => {
        const user = users[1];
        const token = tokens[1];
        const body = {verified: 'true'}

        await request(app)
            .patch(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400);

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.verified).toBe(false);
    })

    it('should verify user if Admin', async () => {
        const user = users[1];
        const token = tokens[2];
        const body = {verified: 'true'}

        const res = await request(app)
            .patch(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.user.verified).toBe(true);

        const updatedUser = await User.findById(user._id);
        expect(updatedUser.verified).toBe(true);
    })

    it('should update another user\'s data by Admin with valid input', async () => {
        const user = users[0];
        const token = tokens[2];
        const body = {name: 'Janet'};

        const res = await request(app)
            .patch(`/api/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200);
        expect(res.body.user.name).toBe(body.name); 
        
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.name).toBe(body.name);
    });

    it('should not update another user\'s data', async () => {
        const user = users[0];
        const token = tokens[1];
        const body = {name: 'Janet'};

        await request(app)
            .patch(`/api/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(401);
    });

    it('should return 401 with invalid userID', async () => {
        const token = tokens[0];
        const hexID = new ObjectID().toString();

        await request(app)
            .patch(`/api/users/${hexID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401);
    });

    it('should return 400 with invalid body data', async () => {
        const user = users[0];
        const token = tokens[0];
        const body = {random: 'field'};
        
        const res = await request(app)
            .patch(`/api/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400);
        
        expect(res.body.error).toBe('Invalid Fields Submitted.');
    });
});

describe('DELETE /api/users/:id', () => {
    beforeAll(setupUsers);

    it('should delete user\'s own account', async () => {
        const user = users[0];
        const token = tokens[0];

        const res = await request(app)
            .delete(`/api/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(res.body.user._id).toBe(user._id.toString());
        expect(res.body.user.name).toBe(user.name);

        const userDB = await User.findById(user._id);
        expect(userDB).toBeNull();
    });

    it('should not delete another user\'s account', async () => {
        const user = users[1];
        const token = tokens[1];
        const user2 = users[2];

        await request(app)
            .delete(`/api/users/${user2._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401);
        
        const userDB = await User.findById(user._id);
        expect(userDB).toBeInstanceOf(User);
    });

    it('should allow admin to delete user\'s account', async () => {
        const user = users[1];
        const admin = users[2];
        const token = tokens[2];

        const res = await request(app)
            .delete(`/api/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(res.body.user._id).toBe(user._id.toString());
        expect(res.body.user.name).toBe(user.name);

        const userDB = await User.findById(user._id);
        expect(userDB).toBeNull();
    });
});

describe('POST /api/users/login', () => {
    it('should send new token to user logging in', async () => {
        const testUser = users[2];

        const res = await request(app)
            .post('/api/users/login')
            .send({email: testUser.email, password: testUser.password})
            .expect(200);
        expect(res.body.token).toBeTruthy();
        expect(res.body.user._id).toBeTruthy();
        expect(res.body.user.name).toBe(testUser.name);
    });

    it('should return 400 on unsuccessful login attempt', async () => {
        const testUser = users[1];

        const res = await request(app)
            .post('/api/users/login')
            .send({email: testUser.email, password: testUser.password + '1!'})
            .expect(400);
        expect(res.header['x-auth']).toBeFalsy();
    });
});
