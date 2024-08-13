const mongoose = require('mongoose')

const Schema =  mongoose.Schema

/* 
schema for collection/database structure for Narcan refill forms
*/

const refillSchema = new Schema({

    organizationName:{
        type: String, 
        required: true
    },

    narcanUsed:{
        type: Number,
        required: true
    },
    narcanNeed:{
        type: Number,
        required: true
    },
    availability: {
        type:[{
            date: {
                type: String, 
                required: true
            },
            startTime:{
                type: String, 
                required: true 
            },
            endTime:{
                type: String, 
                required: true
            }
        }],
        required: true
    },
    fatalOverdoses: {
        type: Number,
        required: true
    },
    nonFatalOverdoses: {
        type: Number,
        required: true
    },
    reversedOverdoses: {
        type: Number,
        required: true
    },
    updateInfo:{
        type: String,
        required: false
    }






})

module.exports = mongoose.model('Refill Narcan form',refillSchema)