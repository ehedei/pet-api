const mongoose = require('mongoose')

exports.treatmentSchema = new mongoose.Schema({
  starDate: {
    type: Date.now,
    required: [true, 'Start Date is requierd']
  },
  endDate: {
    type: Date
  },
  type: {
    type: String,
    required: [true, 'Type is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  observation: {
    type: String
  }
})