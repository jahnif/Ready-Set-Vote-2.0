const maintenance = (req, res, next) => {
    res.status(503).send('Website is currently down. Check back soon.')
}

module.exports = maintenance