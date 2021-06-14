const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  date : { 
    type: Date, 
    required: [true, 'Date field is required']
  }, 
  type : { 
    type: String, 
    required: [true, 'Type field is required']
  }, 
  description : { 
    type: String, 
    required: [true, 'Type field is required']
  }, 
  results: { type: String },
  observations: { type: String },
  vet: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
})

exports.TestModel = mongoose.model('test', testSchema)