const express = require('express')

const router = express.Router()

const {
    getNarcan,
    createNarcan,
    deleteNarcan,
    validatePhoneNumber
} = require('../controllers/narcanController')


//get all narcan request forms
router.get('/',getNarcan)

//post a narcan request form
router.post('/',createNarcan)

//delete a narcan request form
router.delete('/:id',deleteNarcan)

// New route to validate phone number
router.get('/:phoneNumber', validatePhoneNumber);


module.exports = router