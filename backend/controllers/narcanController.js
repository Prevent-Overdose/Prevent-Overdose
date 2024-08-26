const Narcan = require('../models/narcanModel')
const Org = require('../models/organizationModel')

const mongoose = require('mongoose')


/* 
functions for CRUD operations for starter Narcan collection
*/

const getNarcan = async(req,res)=>{
    const forms = await Narcan.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

const createNarcan = async(req,res)=>{
    const {organizationName,state,county,email, monthly_narcan,
        phone_number,availability, address} = req.body

   
   try{
    
    const narc = await Narcan.create({phone_number,availability, address})

    const org = await Org.create({organizationName, phone_number, state, county, email, monthly_reporting: true, monthly_narcan, address})
     
   


    res.status(200).json(narc, org)

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