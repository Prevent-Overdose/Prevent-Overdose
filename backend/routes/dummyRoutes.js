const express = require('express')

const router = express.Router()

const {
    getDummy
} = require('../controllers/dummyController')


//get all narcan request forms
router.get('/',getDummy)



module.exports = router