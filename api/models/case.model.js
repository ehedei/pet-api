const mongoose = require('mongoose')
const { vitalSignsSchema } = require('./vitalsigns.model')

const caseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date of Case is required']
  },
  observations: String,
  purpose: {
    type: String,
    required: [true, 'Purpose is required']
  },
  diet: String,
  habitat: String,
  tests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'test'
  }],
  treatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'treatment'
  }],
  vet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  vitalSigns: vitalSignsSchema
})

exports.CaseModel = mongoose.model('case', caseSchema)
