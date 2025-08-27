const Narcan = require('../models/narcanFulfillmentModel')
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
    const {organizationName,state,county,email, num_boxes, monthly_narcan,
        phone_number,availability, address} = req.body

   
   try{
    
    const narc = await Narcan.create({phone_number, narcan_requested: num_boxes, date: Date.now()})

    const existingOrg = await Org.findOne({ phone_number: phone_number });
    let org = null

    if (existingOrg) {
        org = await Org.findOneAndUpdate({ phone_number: phone_number }, {monthly_narcan: true }, { new: true } );
    }
    else {
        org = await Org.create({organizationName, phone_number: phone_number, state, county, email, availability, monthly_reporting: true, monthly_narcan, address})
    }

      


    res.status(200).json(narc)


   } catch(error){
    res.status(400).json({error:error.message})
   }
}

// unused legacy code -- to be removed

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
        const form = await Org.findOne({ phone_number: phoneNumber });

        if (form) {
            res.status(200).json({ exists: true, message: 'Phone number exists in the dataset.' });
        } else {
            res.status(200).json({ exists: false, message: 'Phone number does not exist in the dataset.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateAvailability = async (req, res) => {
    const { phoneNumber, availability, monthly_narcan } = req.body;
  
    try {
      const existingOrg = await Org.findOne({ phone_number: phoneNumber });
  
      if (!existingOrg) {
        return res.status(404).json({ error: 'Organization not found' });
      }
  
      existingOrg.availability = availability;
      existingOrg.monthly_narcan = monthly_narcan;
      
      await existingOrg.save();
  
      res.status(200).json({ message: 'Availability updated successfully', organization: existingOrg });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const cancelShipments = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const currentMonth = new Date().getMonth() + 1;
        await Narcan.deleteMany({
            phone_number: phoneNumber,
            createdAt: { $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1) }
        });

        await Org.findOneAndUpdate({ phone_number: phoneNumber }, { monthly_refill: false });

        res.status(200).json({ message: "Shipments canceled successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// update availability
const updateAvailability = async (req, res) => {
    const { phoneNumber, availability, monthly_narcan } = req.body;

    console.log("Received phoneNumber:", phoneNumber); // debug log
    console.log("Received availability:", availability); // debug log
    console.log("Received monthly_narcan:", monthly_narcan); // debug log

    try {
        const organization = await Org.findOneAndUpdate(
            { phone_number: phoneNumber },
            { availability, monthly_narcan },
            { new: true }
        );

        if (!organization) {
            console.log("Organization not found"); // debug log
            return res.status(404).json({ message: 'Organization not found' });
        }

        console.log("Availability updated successfully:", organization); // debug log
        res.status(200).json({ message: 'Availability updated successfully', organization });
    } catch (error) {
        console.log("Error updating availability:", error.message); // debug log
        res.status(500).json({ message: 'Failed to update availability', error: error.message });
    }
};

// cancel shipments

const cancelShipments = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const organization = await Org.findOne({ phone_number: phoneNumber });
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        await Narcan.deleteMany({
            phone_number: phoneNumber,
            date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
        });

        await Org.findOneAndUpdate(
            { phone_number: phoneNumber },
            { monthly_narcan: false },
            { new: true }
        );

        res.status(200).json({ message: 'Shipment canceled and refill status updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling shipment', error: error.message });
    }
};


module.exports = {
    getNarcan,
    createNarcan,
    deleteNarcan,
    validatePhoneNumber,
    updateAvailability,
    cancelShipments
<<<<<<< Updated upstream
}
=======
};
>>>>>>> Stashed changes
