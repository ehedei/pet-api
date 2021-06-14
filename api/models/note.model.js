const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User is required']
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  },
  public: {
    type: Boolean,
    required: [true, 'Public status is required'],
    default: false
  }
})

exports.NoteModel = mongoose.model('note', noteSchema)
