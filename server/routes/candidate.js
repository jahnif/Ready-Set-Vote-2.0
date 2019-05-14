const express = require('express');

const adminRequired = require('../middleware/adminRequired');
const authenticate = require('../middleware/authenticate');
const validateID = require('../middleware/validateID');

const Candidate = require('../models/candidate');

const router = new express.Router();

router.post('/candidates', authenticate, async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['name', 'url', 'email', 'phone'];
    const validFields = fields.every((field) => allowedFields.includes(field));

    if (!validFields){
        return res.status(400).send({error: 'Invalid Fields Submitted.'});
    };

    const candidate = await new Candidate(req.body);
    
    try {
        await candidate.save();
        res.status(201).send({candidate});
    } catch(e) {
        res.status(400).send(e);
    };
});

router.get('/candidates/:id', validateID, async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.id);
        if (candidate) {
            res.send({candidate});
        } else {
            res.sendStatus(404);
        };
    } catch(e) {
        res.status(500).send(e);
    };
});

router.patch('/candidates/:id', authenticate, validateID, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'address', 'url', 'email', 'phone'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid Fields Submitted.'
        });
    };

    try {
        const candidate = await Candidate.findById(req.id);
        updates.forEach( update => candidate[update] = req.body[update]);
        await candidate.save();
        res.send({candidate});
    } catch (e) {
        res.status(400).send(e);
    };
});

router.delete('/candidates/:id', authenticate, adminRequired, validateID, async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.id);
        if (!candidate) {
            return res.sendStatus(404);
        };

        return res.send(candidate);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router