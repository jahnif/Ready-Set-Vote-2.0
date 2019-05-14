// Middleware to restrict route to admins only.

const adminRequired = async (req, res, next) => {
    try {
        if (req.user.admin !== true) {
            return res.sendStatus(401);
        }
        next();
    } catch(e) {
        throw new Error('Admin Permissions requires authentication middleware');
    }
};

module.exports = adminRequired