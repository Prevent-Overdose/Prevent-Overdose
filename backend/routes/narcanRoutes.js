const express = require('express')

const router = express.Router()

const {
    getNarcan,
    createNarcan,
    deleteNarcan,
    validatePhoneNumber,
    updateAvailability,
    cancelShipments
} = require('../controllers/narcanController')


//get all narcan request forms
router.get('/',getNarcan)

//post a narcan request form
router.post('/',createNarcan)

//delete a narcan request form
router.delete('/:id',deleteNarcan)

// New route to validate phone number
router.get('/:phoneNumber', validatePhoneNumber);

// update availability
router.post('/update-availability', updateAvailability);

// cancel shipments
router.post('/cancel-shipments', cancelShipments);


module.exports = router