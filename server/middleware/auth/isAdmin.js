// Middleware to restrict route to admins only.
// This middleware MUST come after isAuthenticated so that the user object is added to `req.user`.
// If req.user is not populated, this middleware will always throw an error.

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.admin && req.user.verified) {
            next();
        } else {
            return res.status(401).send({error: 'Administrator privileges required'});
        }
    } catch(e) {
        throw new Error('Admin Permissions requires authentication middleware');
    };
};

module.exports = isAdmin;