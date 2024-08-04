const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orgSchema = new Schema({

    org_name: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        unique: true,
        required: true
    },
    zip_code: {
        type: String,
        required: true
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
    },
    last_service: {
        type: String, 
        enum: ['narcan', 'reporting'],
        required: false
    }     

}, { timestamps: true });

module.exports = mongoose.model('organization', orgSchema);