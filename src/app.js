require('dotenv').config()
const express = require('express')
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express()


// init middleweares
app.use(morgan("dev"))
// app.use(morgan("comined"))
// app.use(morgan("common"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))
app.use(helmet())
app.use(compression())

// console.log(`Process::`,process.env)


// init db
require('./dbs/init.mongodb')
// const {checkOverload} = require('./helpers/check.connect')
// checkOverload()

// init routes
app.get('/', (req, res, next)=>{
    const strCompress = 'Hello NodeJS'

    return res.status(200).json({
        message: 'Welcome to NosdeJS!',
        metadate: strCompress.repeat(1000)
    })
})

// handling error

module.exports = app