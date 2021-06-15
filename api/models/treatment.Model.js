const mongoose = require('mongoose')

const treatmentSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Start Date is requierd'],
    default: Date.now
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

exports.TreatmentModel = mongoose.model('treatment', treatmentSchema)
