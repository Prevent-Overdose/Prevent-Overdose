const Narcan = require('../models/narcanModel')
const mongoose = require('mongoose')
const xlsx = require('xlsx')
const fs = require('fs')
const path = require('path')

//Excel file paths 
const exportDir = path.join(__dirname,'..','exports')
const excelPath = path.join(exportDir, 'narcan_forms.xlsx')
const tempExcelPath = path.join(exportDir, 'narcan_forms_temp.xlsx')

if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
}

const writeExcel = (data, excelPath) =>{
    let workbook 
    let worksheet 

    if (fs.existsSync(excelPath)) {
        workbook = xlsx.readFile(excelPath);
        worksheet = workbook.Sheets['Narcan Forms'];
      } else {
        workbook = xlsx.utils.book_new();
        worksheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Narcan Forms');
    }

    xlsx.utils.sheet_add_json(worksheet, data, { skipHeader: true, origin: -1 });
    xlsx.writeFile(workbook, excelPath);
}

//handler function for writing  if 
//to temp file original excel sheet is open 

const handleWriteExcel = (data) => {
    try {
        writeExcel(data, excelPath)

    } catch(error){
        if (error.code === 'EBUSY' || error.code === 'EPERM'){
            //write to the temporary file if the main excel form is open
            writeExcel(data,tempExcelPath )
        }
        else{
            throw error;
        }
    }
}

//function that merges temp excel file with main after main file is closed
const mergeFiles = ()=>{
    if (fs.existsSync(tempExcelPath)){
        
        const tempWorkbook = xlsx.readFile(tempExcelPath);
        const tempWorksheet = tempWorkbook.Sheets['Narcan Forms'];
        const tempData = xlsx.utils.sheet_to_json(tempWorksheet);

        handleWriteExcel(tempData)
        fs.unlinkSync(tempExcelPath) 
        //delete temp file after merge
    }

}



if (!fs.existsSync(excelPath)){
    writeExcel([
        { Organization: 'Organization', 
        Address: "Address", 
        Telephone: 'Telephone #', 
        number: '# of Overdoses seen per month ', 
        time: 'Availability', 
        createdAt: 'Requested On' }

    ], excelPath)
}

mergeFiles()

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
        Number: form.number,
        Availability: form.time, 
        RequestedOn: formCreatedAt + " ET"
    }

    //temp data merges before new data is posted
    mergeFiles() 
    handleWriteExcel([newRequest]) 

    
    res.status(200).json(form)

   } catch(error){
    if (error.code === 'EBUSY') {
        return res.status(400).json({ error: 'We are currently carrying out requests, please try again in a moment' });
    }
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