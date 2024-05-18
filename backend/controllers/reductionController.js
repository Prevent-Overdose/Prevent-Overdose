const harmReduction = require('../models/otherHarmModel')
const mongoose = require('mongoose')
const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')

//Excel file paths 
const exportDir = path.join(__dirname,'..','exports')
const excelPath = path.join(exportDir, 'OtherHarm_forms.xlsx')

if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
}

const writeExcel = (data) =>{
    let workbook 
    let worksheet 

    if (fs.existsSync(excelPath)) {
        workbook = xlsx.readFile(excelPath);
        worksheet = workbook.Sheets['Other Harm Forms'];
      } else {
        workbook = xlsx.utils.book_new();
        worksheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Other Harm Forms');
    }

    xlsx.utils.sheet_add_json(worksheet, data, { skipHeader: true, origin: -1 });
    xlsx.writeFile(workbook, excelPath);
}


if (!fs.existsSync(excelPath)){
    writeExcel([
        { Organization: 'Organization', 
        Address: "Address", 
        Telephone: 'Telephone #', 
        Supplies: 'Supplies Needed', 
        Number: 'How often are supplies needed',
        createdAt: 'Requested On' }

    ])
}

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
    //format date
    const formCreatedAt = form.createdAt.toLocaleString('en-US', {
        timeZone: 'America/New_York', 
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    //add to excel sheet 
    const newRequest = {
        Organization: form.description, 
        Address: form.address,
        Telephone: form.telephone, 
        Supplies: form.supplies,
        Number: form.number,
        RequestedOn: formCreatedAt + " ET"
    }
    writeExcel([newRequest]) 
    
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
