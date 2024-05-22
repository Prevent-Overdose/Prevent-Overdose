const express = require('express')

const router = express.Router()

const {
    getHarmforms,
    createHarmForm,
    deleteHarmForm

} = require('../controllers/reductionController')


router.get('/', getHarmforms)

router.post('/', createHarmForm)

router.delete('/:id', deleteHarmForm)

module.exports = router