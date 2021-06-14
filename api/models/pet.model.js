const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  birthdate: {
    type: Date,
    required: [true, 'Birthdate is required']
  },
  species: {
    type: String,
    required: [true, 'Species is required']
  },
  breed: String,
  genre: {
    type: String,
    required: [true, 'Genre is required']
  },
  alive: {
    type: Boolean,
    required: [true, 'Status is required'],
    default: true
  },
  description: String,
  alergies: [String],
  record: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'case'
  }],
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'note'
  }]
})

exports.PetModel = mongoose.model('pet', petSchema)
