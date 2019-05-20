const express = require('express');

// Models
const User = require('../models/user');

// Permissions Middleware
const isAdmin = require('../middleware/auth/isAdmin');
const isAuthenticated = require('../middleware/auth/isAuthenticated');
const isVerified = require('../middleware/auth/isVerified');

// Misc. Middleware
const validateID = require('../middleware/validateID');
const paginateOpts = require('../middleware/paginateOpts');

const router = new express.Router();

router.post('/users', async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['name', 'email', 'password'];
    const validFields = fields.every((field) => allowedFields.includes(field));
    if (!validFields){
        return res.status(400).send({
            error: 'Invalid Fields Submitted.'
        });
    }
    
    const user = await new User(req.body);
    
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({token, user});
    } catch(e) {
        if(e.message.indexOf('duplicate key'))
            e.message = `User ${user.email} already exists`
        res.status(400).send(e);
    }
});

router.get('/users', [isAuthenticated, isAdmin, paginateOpts], async (req, res) => {
    try {
        const users = await User.paginate({}, req.paginateOpts);
        // Send the users back as an object, since that allows us to expand it in the future with additional properties.
        res.send({
            users: users.docs, 
            userCount: users.total, 
            offset: users.offset, 
            limit: users.limit
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/me', [isAuthenticated], async (req, res) => {
    // Not adding the isVerified permission check to this route, so volunteers will always have access to their own profiles, even after they have been removed from the project.
    res.send({user: req.user});
});

router.patch('/users/me', [isAuthenticated], async (req, res) => {
    // Not adding the isVerified permission check to this route, so volunteers will always have access to their own profiles, even after they have been removed from the project.
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ 
            error: 'Invalid Fields Submitted.'
        });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send({user: req.user});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/:id', [isAuthenticated, validateID], async (req, res) => {
    try {
        // We need to do another permission check here, rather than in middleware, because we need to check against route variables.
        // Any user, verified or not, should be able to access their profile.
        // However, only verified admins should have this ability.
        if ((req.user.id == req.id) || (req.user.admin === true && req.user.verified === true)) {
            const user = await User.findById(req.id);
            res.send({user});
        } else {
            res.status(401).send({error: 'Unauthorized to view this page'});
        }
        
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/users/:id', [isAuthenticated, validateID], async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'verified'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    // only allow updates if valid updates.
    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid Fields Submitted.'
        });
    }
    
    try {
        // We need to do another permission check here, rather than in middleware, because we need to check against route variables.
        // Any user, verified or not, should be able to change their profile.
        // However, only verified admins should have this ability.
        if ((req.user.id == req.id) || (req.user.admin && req.user.verified)) {
            const user = await User.findById(req.id);
            
            // Only allow admins to modify the 'verified' field.
            if (updates.includes('verified')){
                updates.pop('verified');
                    if(req.user.admin && req.user.verified){
                        user.verified = req.body.verified;
                    } else {
                        return res.status(400).send({
                            error: 'Invalid Fields Submitted.'
                        });
                    }
            }
            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();
            res.send({user});
        } else {
            res.sendStatus(401);
        };
    } catch (e) {
        res.status(400).send(e);
    };
});

router.delete('/users/:id', [isAuthenticated, validateID], async (req, res) => {
    try {
        // We need to do another permission check here, rather than in middleware, because we need to check against route variables.
        // Any user, verified or not, should be able to delete their profile.
        // However, only verified admins should have this ability.
        if ((req.user.id == req.id) || (req.user.admin === true && req.user.verified === true)) {
            const user = await User.findByIdAndDelete(req.id);
            if(!user) {
                return res.sendStatus(404);
            }
            return res.send({ user });
        } else {
            return res.sendStatus(401);
        }
    } catch(e) {
        res.status(500).send(e);
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({token, user});
    } catch (e) {
        res.status(400).send({
            error: 'Unable to login with provided credentials.'
        });
    }
});

module.exports = router;