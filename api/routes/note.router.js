const { checkAuth, checkAdmin } = require('../../utils/auth')
const { getAllNotes, getNoteById, deleteNote, updateNote, saveNote } = require('../controllers/note.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdmin, getAllNotes)
router.get('/:noteId', checkAuth, getNoteById)
router.post('/', checkAuth, saveNote)
router.put('/:noteId', checkAuth, updateNote)
router.delete('/:noteId', checkAuth, deleteNote)

exports.noteRouter = router
