"use strict";

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000

const countConnection = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connection::${numConnection}`)
}

// check over load
const checkOverload = () => {
    setInterval( () => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        //Example maximum number of connection
        const maxConnections = numCores * 5

        console.log(`Memory usage::${memoryUsage / 1024 / 1024} MB`)
        console.log(`Acctive connections:${numConnection}`)
        console.log(`Cores: ${numCores}`)

        if (numConnection > numCores){
            console.log(`Connection over load detected`)
        }

    }, _SECONDS)//Monitor every 5 seconds
}

module.exports = {
    countConnection,
    checkOverload
}
