const mongoose = require('mongoose')

const Schema = mongoose.Schema

const narcanSchema = new Schema({

    description:{
        type: String,
        required:true 
    },

    address:{
        type: String, 
        required: true 
    },

    telephone:{
        type: String, 
        required: true
    },

    number:{
        type: Number,
        required: true
    },

    time:{
        type: String,
        required: true
    }
        
},{timestamps: true})

module.exports = mongoose.model('Narcan', narcanSchema)