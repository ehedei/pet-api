const mongoose = require('mongoose')

exports.vitalSignsSchema = new mongoose.Schema({
  weight: Number,
  height: Number,
  temperature: Number,
  heartRate: Number,
  breathingRate: Number
})
