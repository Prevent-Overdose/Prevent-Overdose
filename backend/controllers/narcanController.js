const Narcan = require('../models/narcanModel')
const mongoose = require('mongoose')
const {format } = require('date-fns')


/* 
functions for CRUD operations for starter Narcan collection
*/

const getNarcan = async(req,res)=>{
    const forms = await Narcan.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

const createNarcan = async(req,res)=>{
    const {organizationName, state, county, address, phoneNumber,email, 
        boxesOfNarcan, availability, monthly_narcan} = req.body

   
   try{
    
    const form = await Narcan.create({organizationName, state, county, address, phoneNumber,email, 
        boxesOfNarcan, availability, monthly_narcan})

        
    //format date
    const formattedCreatedAt = format(form.createdAt, 'MMMM dd, yyyy hh:mm aaaa zzz', { timeZone: 'America/New_York' });
     
    const newRequest = {
        organizationName: form.organizationName,
        state: form.state,
        county: form.county,
        address: form.address,
        phoneNumber: form.phoneNumber,
        email: form.email,
        boxesOfNarcan: form.boxesOfNarcan,
        availability: form.availability,
        monthly_narcan: form.monthly_narcan,
        createdAt: formattedCreatedAt
    }


    res.status(200).json(newRequest)

   } catch(error){
    res.status(400).json({error:error.message})
   }
}

const deleteNarcan = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such form'})
    }

    const form = await Narcan.findOneAndDelete({_id:id})

    if(!form){
        return res.status(404).json({error:'No such form'})
    }

    res.status(200).json(form)

}

const validatePhoneNumber = async (req, res) => {
    const { phoneNumber } = req.params;

    try {
        const form = await Narcan.findOne({ phoneNumber: "+1-"+phoneNumber });

        if (form) {
            res.status(200).json({ exists: true, message: 'Phone number exists in the dataset.' });
        } else {
            res.status(200).json({ exists: false, message: 'Phone number does not exist in the dataset.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getNarcan,
    createNarcan,
    deleteNarcan,
    validatePhoneNumber
}