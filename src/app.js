require('dotenv').config()
const express = require('express')
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express()


// init middleweares
app.use(morgan("dev")) //Show log, thông tin user khi send request
// app.use(morgan("comined"))
// app.use(morgan("common"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))
app.use(helmet()) // Chặn hiển thị thông tin riêng của server
app.use(compression()) // tốn ít băng thông hơn
app.use(express.json()) //Convert sang json
app.use(express.urlencoded({
    extended: true
}))

// console.log(`Process::`,process.env)


// init db
require('./dbs/init.mongodb')
// const {checkOverload} = require('./helpers/check.connect')
// checkOverload()

// init routes
app.use('', require('./routes/index'))


// handling error

module.exports = app