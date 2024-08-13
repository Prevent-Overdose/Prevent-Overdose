const Refill = require('../models/refillModel')
const mongoose = require('mongoose')

/* 
functions for CRUD operations for Narcan refill collection
*/

const getRefill = async(req,res)=>{
    const forms = await Refill.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

const createRefill = async(req,res)=>{
    const {organizationName, narcanUsed, narcanNeed, 
        availability, fatalOverdoses, nonFatalOverdoses,
    reversedOverdoses } = req.body


    try{

    
        const form = await Refill.create({
            organizationName, narcanUsed, narcanNeed, 
            availability, fatalOverdoses, nonFatalOverdoses,
        reversedOverdoses
        })

        res.status(200).json(form)
    
    }catch(error){
        res.status(400).json({error:error.message})
    }

}




const deleteRefill = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such form'})
    }

    const form = await Refill.findOneAndDelete({_id:id})

    if(!form){
        return res.status(404).json({error:'No such form'})
    }

    res.status(200).json(form)

}

module.exports = {
    getRefill,
    createRefill,
    deleteRefill
}