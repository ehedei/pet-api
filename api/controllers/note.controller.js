const { NoteModel } = require('../models/note.model')

exports.getAllNotes = (req, res) => {
  NoteModel
    .find(prepareQuery(req.query))
    .then(notes => {
      res.status(200).json(notes)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.getNoteById = (req, res) => {
  NoteModel
    .findById(req.params.noteId)
    .then(note => {
      if (note) {
        if (res.locals.user.role === 'admin' || note.author === res.locals.user._id) {
          res.status(200).json(note)
        } else {
          res.status(403).json({ msg: 'Access not allowed' })
        }
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.saveNote = (req, res) => {
  const note = {
    date: req.body.date,
    author: res.locals.user._id,
    text: req.body.text,
    public: req.body.public
  }

  NoteModel
    .create(note)
    .then(note => res.status(201).json(note))
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.deleteNote = (req, res) => {
  NoteModel.findByIdAndDelete(req.params.noteId)
    .then(note => {
      if (note) {
        res.status(200).json(note)
      } else {
        res.status(404).json({ msg: 'Resource not found' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ msg: 'Error in Server' })
    })
}

exports.updateNote = async (req, res) => {
  try {
    const note = await NoteModel.findById(req.params.noteId)
    if (note) {
      if (res.locals.user.role === 'admin' || note.author === res.locals.user._id) {
        note.date = req.body.date ?? note.date
        note.text = req.body.text ?? note.text
        note.public = req.body.public ?? note.public
        await note.save()
        res.status(200).json(note)
      } else {
        res.status(403).json({ msg: 'Access not allowed' })
      }
    } else {
      res.status(404).json({ msg: 'Resource not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

function prepareQuery(query) {
  const resultQuery = {}

  if (query.hasOwnProperty('author')) resultQuery.author = query.author

  if (query.hasOwnProperty('date')) resultQuery.date = query.date

  if (query.hasOwnProperty('public')) resultQuery.public = query.public

  if (query.public?.toLowerCase() === 'true') {
    resultQuery.alive = true
  } else if (query.alive?.toLowerCase() === 'false') {
    resultQuery.alive = false
  }

  return resultQuery
}
