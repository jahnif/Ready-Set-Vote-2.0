const express = require('express');

const User = require('../models/user');
const adminRequired = require('../middleware/adminRequired');
const authenticate = require('../middleware/authenticate');
const validateID = require('../middleware/validateID');

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
        res.status(400).send(e);
    }
});

router.get('/users', authenticate, adminRequired, async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const users = await User.find();
        // Send the users back as an object, since that allows us to expand it in the future with additional properties.
        res.send({userCount, users});
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/me', authenticate, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/me', authenticate, async (req, res) => {
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
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users/:id', authenticate, validateID, async (req, res) => {
    try {
        if ((req.user.id == req.id) || (req.user.admin === true)) {
            const user = await User.findById(req.id);
            res.send(user);
        } else {
            res.sendStatus(401);
        }
        
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/users/:id', authenticate, validateID, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    // only allow updates if valid updates.
    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid Fields Submitted.'
        });
    }
    
    try {
        if ((req.user.id == req.id) || (req.user.admin === true)){
            const user = await User.findById(req.id);
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

router.delete('/users/:id', authenticate, validateID, async (req, res) => {
    try {
        if ((req.id == req.user._id) || (req.user.admin === true)){
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