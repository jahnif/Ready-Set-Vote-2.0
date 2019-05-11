const {ObjectID} = require('mongodb');

// NB: validateID assigns the /:id param to req.id if it is valid.
const validateID = (req, res, next) => {
    const id = req.params.id;

    // Validate id is correct using isValid
    if(!ObjectID.isValid(id)) {
        return res.sendStatus(400);
    }
    req.id = id;
    next();
}

module.exports = validateID