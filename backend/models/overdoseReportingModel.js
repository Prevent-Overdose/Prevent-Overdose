const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orgSchema = new Schema({

    phone_number: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    fatal: {
        type: Number,
        required: true
    },
    nonfatal: {
        type: Number,
        required: true
    },
    reversed: {
        type: Number,
        required: true
    }     

});

module.exports = mongoose.model('overdose_reporting', orgSchema);