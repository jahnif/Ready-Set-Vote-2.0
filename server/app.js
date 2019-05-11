require ('./db/mongoose')
const path = require('path')
const express = require('express')
const cors = require('cors')

const userRouter = require('./routes/user')
const candidateRouter = require('./routes/candidate')

let app = express()

app.use(express.json())
// Remember to set up CORS whitelist for production.
// const corsOptions = require('./config/cors)
// app.use(cors(corsOptions))
app.use(cors())

// Register Routes
app.use(userRouter)
app.use(candidateRouter)

if (process.env.NODE_ENV === 'production') {    
    app.use(express.static(path.join(__dirname, '..', '/client/build')))
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', '/client/build/index.html'))
    })
}

module.exports = app