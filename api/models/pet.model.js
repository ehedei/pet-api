const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({})

exports.PetModel = mongoose.model('pet', petSchema)
