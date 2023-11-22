"use strict";
const mongose = require('mongoose')

const connectString = `mongodb://localhost:27017`

mongose.connect( connectString).then( _ => console.log(`Connect Mongodb Success`))
    .catch( err => console.log(`Error Connect`))

//dev
if (1===1){
    mongose.set('debug', true)
    mongose.set('debug', {color: true})
}

module.exports = mongose
