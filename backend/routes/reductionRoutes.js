const express = require('express')

const router = express.Router()

const {
    getHarmforms,
    createHarmForm,
    deleteHarmForm

} = require('../controllers/reductionController')

//get all harm reduction forms
router.get('/', getHarmforms)

//create harm reduction form
router.post('/', createHarmForm)

//delete harm reduction form
router.delete('/:id', deleteHarmForm)

module.exports = router