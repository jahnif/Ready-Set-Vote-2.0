const express = require('express');

// Models
const Endorser = require('../models/endorser');

// Permissions Middleware
const isAdmin = require('../middleware/auth/isAdmin');
const isAuthenticated = require('../middleware/auth/isAuthenticated');
const isVerified = require('../middleware/auth/isVerified');

// Misc. Middleware
const validateID = require('../middleware/validateID');
const paginateOpts = require('../middleware/paginateOpts');

const router = new express.Router();

router.post('/endorsers', [isAuthenticated, isVerified], async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['name', 'url', 'sortOrder', 'imageUrl'];
    const validFields = fields.every((field) => allowedFields.includes(field));

    if (!validFields){
        return res.status(400).send({error: 'Invalid Fields Submitted.'});
    };
    
    try {
        const endorser = await new Endorser(req.body);
        await endorser.save();
        res.status(201).send({endorser});
    } catch(e) {
        res.status(400).send(e);
    };
});

router.get('/endorsers', [paginateOpts], async (req, res) => {
    try {
        const endorsers = await Endorser.paginate({}, req.paginateOpts);
        return res.send({
            endorsers: endorsers.docs, 
            endorserCount: endorsers.total, 
            limit: endorsers.limit, 
            offset: endorsers.offset
        });
    } catch(e) {
        res.status(500).send(e);
    }
})

router.get('/endorsers/:id', [validateID], async (req, res) => {
    try {
        const endorser = await Endorser.findById(req.id);    
        if (endorser) {
            return res.send({ endorser });
        } else {
            return res.sendStatus(404);
        };
    } catch(e) {
        res.status(500).send(e);
    };
});

router.patch('/endorsers/:id', [isAuthenticated, isVerified, validateID], async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'url', 'sortOrder', 'imageUrl'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));
    
    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid Fields Submitted.'
        });
    };

    try {
        const endorser = await Endorser.findById(req.id);
        updates.forEach( update => endorser[update] = req.body[update] );
        await endorser.save();
        res.send({ endorser });
    } catch (e) {
        res.status(400).send(e);
    };
});

router.delete('/endorsers/:id', [isAuthenticated, isAdmin, validateID], async (req, res) => {
    try {
        const endorser = await Endorser.findByIdAndDelete(req.id);
        if (!endorser) {
            return res.sendStatus(404);
        };

        return res.status(204).send();
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router