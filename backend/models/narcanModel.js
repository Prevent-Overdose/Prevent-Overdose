const mongoose = require('mongoose')

const Schema = mongoose.Schema

/* 
schema for collection/database structure for Starter Narcanforms
*/

const narcanSchema = new Schema({

    organizationName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    boxesOfNarcan: {
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
    monthly_narcan:{
        type: Boolean,
        required: true
    },
    createdAt: {
        type: String,
        required: false
    }
    

}, { timestamps: true });

module.exports = mongoose.model('Starter NarcanForm', narcanSchema);