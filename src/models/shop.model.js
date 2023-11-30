"use strict";

const {model, Schema, Types } = require('mongoose')

const DOCUMENT_NAME = 'shop'
const COLLECTION_NAME = 'Shops'

//Declare the Schema of the Mongo model
const shopSchema = new Schema({
    name:{
        type:String,
        trim: true,
        maxlength: 150
    },
    email:{
        type:String,
        unique: true,
        trim: true
    },
    password:{
        type:String,
        require: true,
    },
    status:{
        type:String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify:{
        type:String,
        default: false
    },
    roles:{
        type:Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);