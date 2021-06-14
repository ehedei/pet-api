const mongoose = require('mongoose')
const { addressSchema } = require('./address.model')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: [true, 'Email field must be unique'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Error: Wrong email format.'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  username: {
    type: String,
    unique: [true, 'User already exists in Application']
  },
  firstName: String,
  lastName: String,
  phone: {
    type: String
    // TODO match telephone
  },
  mobile: {
    type: String
    // TODO match telephone
  },
  role: {
    type: String,
    enum: ['admin', 'vet', 'user'],
    default: 'user',
    required: ['true', 'Every user must have a role']
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pet'
  }],
  address: addressSchema
})

exports.UserModel = mongoose.model('user', userSchema)
