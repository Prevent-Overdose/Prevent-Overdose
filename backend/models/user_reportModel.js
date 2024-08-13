const mongoose = require('mongoose')

const Schema = mongoose.Schema

/* 
schema for collection/database structure for individual OD reporting 
*/

const userSchema = new Schema({
    address:{
        type: String, 
        required: true
    },
    zipcode:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String, 
        required: true
    },
    monthly_reporting:{
        type: Boolean,
        required: true
    }


})
module.exports = mongoose.model('Individual Report', userSchema);