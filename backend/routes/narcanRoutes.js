const express = require('express')

const router = express.Router()

const {
    getNarcan,
    createNarcan,
    deleteNarcan
} = require('../controllers/narcanController')


//get all narcan request forms
router.get('/',getNarcan)

//post a narcan request form
router.post('/',createNarcan)

//delete a narcan request form
router.delete('/:id',deleteNarcan)


module.exports = router