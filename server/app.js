require ('./db/mongoose');
const path = require('path');
const express = require('express');
const cors = require('cors');

const candidateRouter = require('./routes/candidate');
const endorserRouter = require('./routes/endorser');
const measureRouter = require('./routes/measure');
const userRouter = require('./routes/user');

let app = express();

app.use(express.json());
// Remember to set up CORS whitelist for production.
// const corsOptions = require('./config/cors);
// app.use(cors(corsOptions));
app.use(cors());

// Register Routes
app.use('/api', candidateRouter);
app.use('/api', endorserRouter);
app.use('/api', measureRouter);
app.use('/api', userRouter);

if (process.env.NODE_ENV === 'production') {    
    app.use(express.static(path.join(__dirname, '..', '/client/build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '/client/build/index.html'));
    });
};

module.exports = app;