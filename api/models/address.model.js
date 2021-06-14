const mongoose = require('mongoose')

exports.addressSchema = new mongoose.Schema({
  direction: {
    type: String,
    required: [true, 'Direction is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: String,
  country: String
})
