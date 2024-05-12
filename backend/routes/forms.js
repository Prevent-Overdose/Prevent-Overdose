const express = require('express')

const router = express.Router()


//get all narcan request forms
router.get('/',(req,res)=>{
    res.json({mssg: 'Get all reqs'})

})

//post a narcan request form
router.post('/',(req,res)=>{
    res.json({mssg:'Post a new form'})
})

//delete a narcan request form
router.delete('/:id',(req,res)=>{
    res.json({mssg:'Delete a form'})
})


module.exports = router