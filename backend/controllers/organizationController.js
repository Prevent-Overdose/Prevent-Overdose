const org_db = require('../models/organizationModel');
const narcan_db = require('../models/narcanFulfillmentModel');
const mongoose = require('mongoose')


const createNarcanOrganization = async(req,res)=>{
    const {organizationName,state,county, phone_number, email, availability, address, num_boxes} = req.body

   
   try{
    

    const existingOrg = await org_db.findOne({ phone_number: phone_number });
    let org = null

    if (existingOrg) {
        org = await org_db.findOneAndUpdate({ phone_number: phone_number }, {monthly_narcan: true }, { new: true } );
    }
    else {
        org = await org_db.create({organizationName, phone_number: phone_number, state, county, email, availability, monthly_reporting: false, monthly_narcan: true, address,
            last_service: 'narcan',
        })
        const narc = await narcan_db.create({phone_number, narcan_requested: num_boxes, date: Date.now()})

    }

      


    res.status(200).json(narc)


   } catch(error){
    res.status(400).json({error:error.message})
   }
}

const createReportingOrganization = async(req,res)=>{
    const {organizationName,state,county, phone_number, email, address} = req.body

   
   try{
    
    const existingOrg = await org_db.findOne({ phone_number: phone_number });
    let org = null

    if (existingOrg) {
        org = await org_db.findOneAndUpdate({ phone_number: phone_number }, {reporting: true }, { new: true } );
    }
    else {
        org = await org_db.create({organizationName, phone_number: phone_number, state, county, email, monthly_reporting: true, monthly_narcan: false, address,
            last_service: 'reporting',
        })
    }

      


    res.status(200).json(narc)


   } catch(error){
    res.status(400).json({error:error.message})
   }
}