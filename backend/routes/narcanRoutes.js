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

<<<<<<< Updated upstream
// update availability
router.post('/update-availability', updateAvailability);

// cancel shipments
router.post('/cancel-shipments', cancelShipments);
=======
// route to update availability
router.post('/updateAvailability', updateAvailability);

// route to cancel shipments
router.post('/cancelShipments', cancelShipments);
>>>>>>> Stashed changes


module.exports = router