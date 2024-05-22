const Narcan = require('../models/narcanModel')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: process.env.USER,
        pass: process.env.PASS
    }
})

const sendEmail = (formData) =>{
    const mailOptions = {
        from: process.env.USER,
        to: 'Kingzewdie16@gmail.com',
        subject: '**New Narcan Request**' ,
        text: `New Narcan Request Details:\n\n
        Organization: ${formData.Organization}\n
        Address: ${formData.Address}\n
        Telephone: ${formData.Telephone}\n
        Number of Overdoses per month: ${formData.Number}\n
        Availability: ${formData.Availability}\n
        Requested On: ${formData.RequestedOn}`

    }

    transporter.sendMail(mailOptions,(error, info)=>{
        if (error){
            console.error('Error sending email:', error);        }
        else{
            console.log('Email sent:', info.response);
        }
    })
}

const getNarcan = async(req,res)=>{
    const forms = await Narcan.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

const createNarcan = async(req,res)=>{
    const {description, address, telephone, number, time} = req.body

   
   try{
    const form = await Narcan.create({description, address, telephone, number, time})
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
        Number: form.number,
        Availability: form.time, 
        RequestedOn: formCreatedAt + " ET"
    }
    sendEmail(newRequest)
    
    res.status(200).json(form)

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

module.exports = {
    getNarcan,
    createNarcan,
    deleteNarcan
}