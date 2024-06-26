
const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const harmReduction = new Schema({
    
    description:{
        type: String ,
        required: true
    },
    address:{
        type: String, 
        required: true
    },
    telephone:{
        type: String, 
        required: true
    }, 
    supplies:{
        type: String, 
        required: true
    },
    number:{
        type: String, 
        required: true 
    }

},{timestamps:true})
module.exports = mongoose.model('Harm Reduction form', harmReduction)