const harmReduction = require('../models/otherHarmModel')
const mongoose = require('mongoose')

//get all harm reduction forms
const getHarmforms = async(req,res)=>{
    const forms = await harmReduction.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

//create a new form 
const createHarmForm = async(req,res)=>{
    const {description, address, telephone, supplies, number} = req.body

   //add to db
   try{
    const form = await harmReduction.create({description, address, telephone, supplies, number})
    res.status(200).json(form)

   } catch(error){
    res.status(400).json({error:error.message})
   }
}

//delete a form 
const deleteHarmForm = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such form'})
    }

    const form = await harmReduction.findOneAndDelete({_id:id})

    if(!form){
        return res.status(404).json({error:'No such form'})
    }

    res.status(200).json(form)

}

module.exports = {
    getHarmforms,
    createHarmForm,
    deleteHarmForm
}
