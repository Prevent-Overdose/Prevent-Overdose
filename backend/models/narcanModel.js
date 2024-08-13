const mongoose = require('mongoose')

const Schema = mongoose.Schema

/* 
schema for collection/database structure for Starter Narcanforms
*/

const narcanSchema = new Schema({

    
    phoneNumber: {
        type: String,
        required: true
    },
    address:{
        type: String,
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

 
}, { timestamps: true });

module.exports = mongoose.model('Starter NarcanForm', narcanSchema);