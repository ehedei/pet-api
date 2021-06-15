const { checkAuth, checkAdmin } = require('../../utils/auth')
const { getAllNotes, getNoteById, deleteNote, updateNote } = require('../controllers/note.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdmin, getAllNotes)
router.get('/:noteId', checkAuth, checkAdmin, getNoteById)
router.post('/', checkAuth, checkAdmin)
router.put('/:noteId', checkAuth, checkAdmin, updateNote)
router.delete('/:noteId', checkAuth, checkAdmin, deleteNote)

exports.noteRouter = router
