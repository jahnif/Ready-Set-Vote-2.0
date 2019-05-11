const express = require('express');

const authenticate = require('../middleware/authenticate');
const validateID = require('../middleware/validateID');

const Candidate = require('../models/candidate');

const router = new express.Router();

router.post('/candidates', async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['name', 'url', 'email', 'phone'];
    const validFields = fields.every((field) => allowedFields.includes(field));
    if (!validFields){
        return res.status(400).send({errors: {'fieldError': 'Invalid Fields Submitted'}});
    }
    const candidate = await new Candidate(req.body);
    
    try {
        await candidate.save();
        res.status(201).send({candidate});
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/candidates/:id', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        res.send({candidate})
    } catch(e) {
        res.status(500).send(e);
    }
})

module.exports = router