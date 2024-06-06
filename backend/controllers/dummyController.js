const mongoose = require('mongoose')

const getDummy = async(req,res)=>{
    res.status(200).json('dummy success')
}

module.exports = {
    getDummy
}