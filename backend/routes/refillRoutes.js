const express = require('express')

const router = express.Router()

const {
    getRefill,
    createRefill,
    deleteRefill
} = require('../controllers/refillController')


//get all narcan request forms
router.get('/',getRefill)

//post a narcan request form
router.post('/',createRefill)

//delete a narcan request form
router.delete('/:id',deleteRefill)


module.exports = router