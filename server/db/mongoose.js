const mongoose = require('mongoose');
const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

mongoose.promise = global.Promise;
mongoose.connect(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_URI}/${process.env.MONGO_DB}_${environment}?retryWrites=true`,	
	{
	    useNewUrlParser: true,
	    useCreateIndex: true,
	    useFindAndModify: false
	})

module.exports = {mongoose}