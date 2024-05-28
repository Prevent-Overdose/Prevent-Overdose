const harmReduction = require('../models/otherHarmModel')
const mongoose = require('mongoose')


const getHarmforms = async(req,res)=>{
    const forms = await harmReduction.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

const createHarmForm = async(req,res)=>{
    const {description, address, telephone, supplies, number} = req.body

   //add to db
   try{
    const form = await harmReduction.create({description, address, telephone, supplies, number})
    //format date
    const formCreatedAt = form.createdAt.toLocaleString('en-US', {
        timeZone: 'America/New_York', 
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    const newRequest = {
        Organization: form.description, 
        Address: form.address,
        Telephone: form.telephone, 
        Supplies: form.supplies,
        Number: form.number,
        RequestedOn: formCreatedAt + " ET"
    }
    
    res.status(200).json(form)

   } catch(error){
    res.status(400).json({error:error.message})
   }
}

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
