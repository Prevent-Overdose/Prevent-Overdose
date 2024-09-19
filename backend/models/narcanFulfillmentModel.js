const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fulfillSchema = new Schema({

    phone_number: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    narcan_requested: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('narcan_fulfillment', fulfillSchema);