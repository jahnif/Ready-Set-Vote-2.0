const mongoose = require('mongoose');

mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = {mongoose};