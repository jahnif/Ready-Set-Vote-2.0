const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')

const app = require('../server/app')
const User = require('../server/models/user')
const { users, tokens, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

describe('GET /users', () => {
    it('should return user list if admin', async () => {
        const token = tokens[2]

        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.userCount).toBe(4)
        expect(res.body.users.length).toBe(4)
    })

    it('should return 401 if not admin', async () => {
        await request(app)
            .get('/users')
            .expect(401)
    })
})

describe('POST /users', () => {
    
    it('should create a user', async () => {
        const email = 'example@example.com'
        const password = '1234password'
        const name = 'example'

        const res = await request(app)
            .post('/users')
            .send({name, email, password})
            .expect(201)
        
        const user = await User.findById(res.body.user._id)
        expect(user).toBeTruthy()
        expect(user.password).not.toBe(password)

        expect(res.body.token).toBeTruthy()
        expect(res.body.user._id).toBeTruthy()
        expect(res.body.user.name).toBe(name)
    })

    it('should return proper validation errors if request invalid', async () => {
        const email = 'dustin.com'
        const password = ''

        const res = await request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
        
        const errors = res.body.errors
        expect(errors.name).toBeTruthy()
        expect(errors.email).toBeTruthy()
        expect(errors.password).toBeTruthy()
    })

    it('should not create user if email already in database', async () => {
        await request(app)
            .post('/users')
            .send({email: users[0].email, password: 'password123'})
            .expect(400)
    })

    it('should return 400  and field error if user sends incorrect fields', async () => {
        const email = 'example@example.com'
        const password = 'valid_pw'
        const name = 'example'
        const randomField = 'junkData'

        const res = await request(app)
            .post('/users')
            .send({email, password, name, randomField})
            .expect(400)
        
        const errors = res.body.errors
        expect(errors.fieldError).toBeTruthy()
    })
})

describe('GET /users/me', () => {
    it('should return user\'s account', async () => {
        const user = users[0]
        const token = tokens[0]

        const res = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body._id).toBe(user._id.toString())
        expect(res.body.name).toBe(user.name)
    })
})

describe('GET /users/:id', () => {
    it('should return own user object', async () => {
        const user = users[0]
        const token = tokens[0]

        const res = await request(app)
            .get(`/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body._id).toBe(user._id.toString())
        expect(res.body.name).toBe(user.name)
    })
    
    it('should return user object if Admin', async () => {
        const user = users[0]
        const admin = users[2]
        const token = tokens[2]

        const res = await request(app)
            .get(`/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body._id).toBe(user._id.toString())
        expect(res.body.name).toBe(user.name)
    })

    it('should return 400 if incorrect userID requested', async () => {
        const user = users[0]
        const token = tokens[0]

        await request(app)
            .get(`/users/${user._id.toString()}1`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
    })

    it('should return 401 if not requesting self and not admin', async () => {
        const user = users[0]
        const token = tokens[0]
        const user2 = users[1]

        const res = await request(app)
            .get(`/users/${user2._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
    })
});

describe('PATCH /users/me', () => {
    it('should update user\'s own data with valid input', async () => {
        const token = tokens[0]
        const body = {name: 'Janet'}

        const res = await request(app)
            .patch('/users/me').set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200)
        expect(res.body.name).toBe('Janet')
    })

    it('should not update user\'s own data with invalid input', async () => {
        const token = tokens[0]
        const body = {random: 'Janet'}

        const res = await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400)
        
        const errors = res.body.errors
        expect(errors.fieldError).toBeTruthy()
    })
})

describe('PATCH /users/:id', () => {
    it('should update user\'s own data with valid input', async () => {
        const user = users[0]
        const token = tokens[0]
        const body = {name: 'Janet'}

        const res = await request(app)
            .patch(`/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200)
        expect(res.body.user.name).toBe('Janet')
    })

    it('should update another user\'s data by Admin with valid input', async () => {
        const user = users[0]
        const token = tokens[2]
        const body = {name: 'Janet'}

        const res = await request(app)
            .patch(`/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200)
        expect(res.body.user.name).toBe('Janet')  
    })

    it('should not update another user\'s data', async () => {
        const user = users[0]
        const token = tokens[1]
        const body = {name: 'Janet'}

        await request(app)
            .patch(`/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(401)
    })

    it('should return 401 with invalid userID', async () => {
        const token = tokens[0]
        const hexID = new ObjectID().toString()

        await request(app)
            .patch(`/users/${hexID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
    })

    it('should return 400 with invalid body data', async () => {
        const user = users[0]
        const token = tokens[0]
        const body = {random: 'field'}
        
        const res = await request(app)
            .patch(`/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(400)
        
        const errors = res.body.errors
        expect(errors.fieldError).toBeTruthy()
    })
})

describe('DELETE /users/:id', () => {
    it('should delete user\'s own account', async () => {
        const user = users[0]
        const token = tokens[0]

        const res = await request(app)
            .delete(`/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body._id).toBe(user._id.toString())
        expect(res.body.name).toBe(user.name)
    })

    it('should not delete another user\'s account', async () => {
        const user = users[0]
        const token = tokens[0]
        const user2 = users[1]

        await request(app)
            .delete(`/users/${user2._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
    })

    it('should allow admin to delete user\'s account', async () => {
        const user = users[0]
        const admin = users[2]
        const token = tokens[2]

        const res = await request(app)
            .delete(`/users/${user._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body._id).toBe(user._id.toString())
        expect(res.body.name).toBe(user.name)
    })
})

describe('POST /users/login', () => {
    it('should send new token to user logging in', async () => {
        const testUser = users[1]

        const res = await request(app)
            .post('/users/login')
            .send({email: testUser.email, password: testUser.password})
            .expect(200)
        expect(res.body.token).toBeTruthy()
        expect(res.body.user._id).toBeTruthy()
        expect(res.body.user.name).toBe(testUser.name)
    })

    it('should return 400 on unsuccessful login attempt', async () => {
        const testUser = users[1]

        const res = await request(app)
            .post('/users/login')
            .send({email: testUser.email, password: testUser.password + '1!'})
            .expect(400)
        expect(res.header['x-auth']).toBeFalsy()
    })
})
