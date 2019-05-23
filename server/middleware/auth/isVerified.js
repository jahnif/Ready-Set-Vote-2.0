// Middleware to verify that user has permissions to add and edit database information. 
// E.g., Candidates, Endorsers, Endorsements, Etc.
// This middleware MUST be added after isAuthenticated middleware or it will always throw an error, because the `req.user` object will not be populated.

const isVerified = async (req, res, next) => {
    try {
        if (!req.user.verified) {
            return res.sendStatus(401);
        }
        next();
    } catch(e) {
        throw new Error('Only verified users may access this route');
    };
};

module.exports = isVerified;