const Narcan = require('../models/narcanModel')
const mongoose = require('mongoose')

//get all narcan forms
const getNarcan = async(req,res)=>{
    const forms = await Narcan.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

//create a new form 
const createNarcan = async(req,res)=>{
    const {description, address, telephone, number, time} = req.body

   //add to db
   try{
    const form = await Narcan.create({description, address, telephone, number, time})
    res.status(200).json(form)

   } catch(error){
    res.status(400).json({error:error.message})
   }
}

//delete a form 
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

module.exports = {
    getNarcan,
    createNarcan,
    deleteNarcan
}