const express = require('express');

// MODELS
const Candidate = require('../models/candidate');
const Party = require('../models/party');
const Endorser = require('../models/endorser');

// Permissions Middleware
const isAdmin = require('../middleware/auth/isAdmin');
const isAuthenticated = require('../middleware/auth/isAuthenticated');
const isVerified = require('../middleware/auth/isVerified');

// Misc. Middleware
const validateID = require('../middleware/validateID');

const router = new express.Router();

router.post('/candidates', [isAuthenticated, isVerified], async (req, res) => {
    const fields = Object.keys(req.body);
    const allowedFields = ['name', 'url', 'email', 'phone', 'party', 'endorsements'];
    const validFields = fields.every((field) => allowedFields.includes(field));

    if (!validFields){
        return res.status(400).send({error: 'Invalid Fields Submitted.'});
    };
    
    try {
        const { name, url, email, phone } = req.body;
        const candidate = await new Candidate({name, url, email, phone});

        // If party exists in DB get its _id. Otherwise, create it.
        if (fields.includes('party')){
            const partyQuery = {'name': req.body.party};
            let party = await Party.findOneAndUpdate(partyQuery, partyQuery, {upsert: true, new: true});
            candidate.party = party._id;
        }

        // Iterate through endorsements array. If Endorser exists in DB, get its _id. Otherwise, create it.
        if (fields.includes('endorsements')){
            if (req.body.endorsements.every( endorsement => (typeof endorsement === 'string'))){
                const endorsementPromises = req.body.endorsements.map(async endorser => {
                    let endorserObj = await Endorser.findOneAndUpdate({name: endorser}, {name: endorser}, {upsert: true, new: true});
                    return endorserObj._id;
                });
                // Because findOneAndUpdate() returns a promise, we have to use Promise.all() to resolve the promise before we can assign it.
                const endorsements = await Promise.all(endorsementPromises);
                candidate.endorsements = endorsements;
            }
        }
        await candidate.save()
        await candidate.populate('party').execPopulate();
        res.status(201).send({candidate});
    } catch(e) {
        res.status(400).send(e);
    };
});

router.get('/candidates/:id', [validateID], async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.id);    
        if (candidate) {
            return res.send({candidate});
        } else {
            return res.sendStatus(404);
        };
    } catch(e) {
        res.status(500).send(e);
    };
});

router.patch('/candidates/:id', [isAuthenticated, isVerified, validateID], async (req, res) => {
    // Updates are a bit more complex than creation. We need to nest our fields within a {$set: {}} object.
    // See https://docs.mongodb.com/manual/reference/operator/update/set/
    let updates = {'$set': {}};
    const body = Object.keys(req.body);
    const allowedUpdates = ['name', 'address', 'url', 'email', 'phone', 'party', 'endorsements'];
    const foreignFieldUpdates = ['party', 'endorsements'];
    const isValidOperation = body.every( update => allowedUpdates.includes(update));
    
    if(!isValidOperation){
        return res.status(400).send({
            error: 'Invalid Fields Submitted.'
        });
    };

    try {                
        // Same as in POST - find or create new Party.
        if (body.includes('party')){
            const party = await Party.findOneAndUpdate({name: req.body.party}, {name: req.body.party}, {upsert: true, new: true});
            updates.$set.party = party._id;
        };

        if (body.includes('endorsements')){
            // as in the POST route, we check if the Endorser exists. If so, we get its _id, if not we create one and grab the new _id.
            // We then assign that new array to candidate.endorsements.
            if (req.body.endorsements.every( endorsement => (typeof endorsement === 'string'))){
                const endorsementPromises = req.body.endorsements.map(async endorser => {
                    let endorserObj = await Endorser.findOneAndUpdate({name: endorser}, {name: endorser}, {upsert: true, new: true});
                    return endorserObj._id;
                });
                // Because findOneAndUpdate() returns a promise, we have to use Promise.all() to resolve the promise before we can assign it.
                // We don't need to do this with Party above, because it's within the scope of the main async function. This is not.
                const endorsements = await Promise.all(endorsementPromises);
                updates.$set.endorsements = endorsements;
            } else {
                return res.status(400).send({
                    error: 'Endorsements must be strings.'
                });
            };
        };

        // Iterate through the rest of the fields that were submitted and add them to the updates.$set object.
        // We can't use object destructuring here, since that could result in null values that would override existing ones. Remember, we're PATCHing here.
        body.forEach( update => (!foreignFieldUpdates.includes(update)) ? updates.$set[update] = req.body[update] : null);
        const candidate = await Candidate.findOneAndUpdate({ _id: req.id }, updates, {new: true});
        await candidate.populate('party').execPopulate();
        res.send({candidate});
    } catch (e) {
        res.status(400).send(e);
    };
});

router.delete('/candidates/:id', [isAuthenticated, isAdmin, validateID], async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.id);
        if (!candidate) {
            return res.sendStatus(404);
        };
        return res.sendStatus(204);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router