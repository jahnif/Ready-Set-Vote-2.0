const express = require('express');

const adminRequired = require('../middleware/adminRequired');
const authenticate = require('../middleware/authenticate');
const validateID = require('../middleware/validateID');
const paginateOpts = require('../middleware/paginateOpts');

const Measure = require('../models/measure');

const router = new express.Router();

router.post('/measures', authenticate, async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['title', 'description', 'options'];
    const validFields = fields.every((field) => allowedFields.includes(field));

    if (!validFields){
        return res.status(400).send({error: 'Invalid Fields Submitted.'});
    };
    
    try {
        const measure = await new Measure(req.body);
        await measure.save();
        res.status(201).send({ measure });
    } catch(e) {
        res.status(400).send(e);
    };
});

router.get('/measures', paginateOpts, async (req, res) => {
    try {
        const measures = await Measure.paginate({}, req.paginateOpts);
        return res.send({ 
            measures: measures.docs,
            measuresCount: measures.total,
            limit: measures.limit,
            offset: measures.offset
        });
    } catch(e) {
        res.status(500).send(e);
    }
})

router.get('/measures/:id', validateID, async (req, res) => {
    // TODO - Populate endorsements.
    try {
        const measure = await Measure.findById(req.id);    
        if (measure) {
            return res.send({ measure });
        } else {
            return res.sendStatus(404);
        };
    } catch(e) {
        res.status(500).send(e);
    };
});

router.patch('/measures/:id', authenticate, validateID, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'options' ];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));
    
    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid Fields Submitted.'
        });
    };

    try {
        const measure = await Measure.findById(req.id);
        updates.forEach( update => measure[update] = req.body[update] );
        await measure.save();
        res.send({ measure });
    } catch (e) {
        res.status(400).send(e);
    };
});

router.delete('/measures/:id', authenticate, adminRequired, validateID, async (req, res) => {
    try {
        const measure = await Measure.findByIdAndDelete(req.id);
        if (!measure) {
            return res.sendStatus(404);
        };

        return res.send({ measure });
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router