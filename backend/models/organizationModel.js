const mongoose = require('mongoose')

const Schema = mongoose.Schema

/* 
schema for collection/database structure for Organizations
*/

const orgSchema = new Schema({

    organizationName: {
        type: String,
        required: false
    },
    state:{
        type: String, 
        required: true
    },
    county:{
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        unique: true,
        required: true
    },
    email:{
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
        required: false
    },
    address: {
        type: String,
        required: true
    },
    monthly_narcan: {
        type: Boolean,
        required: true
    },
    monthly_reporting: {
        type: Boolean,
        required: true
    } 

}, { timestamps: true });

module.exports = mongoose.model('organization', orgSchema);