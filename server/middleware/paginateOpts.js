// ?limit=<#>&offset=<#> (pagination)
// ?sortBy=<field>:<asc/desc> (sorting)
const paginateOpts = (req, res, next) => {
    let sort = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
    }

    req.paginateOpts = {
        offset: parseInt(req.query.offset) ? parseInt(req.query.offset) : 0,
        limit: parseInt(req.query.limit) ? parseInt(req.query.limit) : 10,
        sort
    };
    next();
};

module.exports = paginateOpts
;