const { checkAuth, checkAdminOrVet } = require('../../utils/auth')
const { getAllPets, getPetById, savePet, updatePet, deletePet, deleteNoteFromPet, getNotesFromPet, addNoteToPet, createNoteToPet } = require('../controllers/pet.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdminOrVet, getAllPets)
router.get('/:petId', checkAuth, checkAdminOrVet, getPetById)
router.post('/', checkAuth, checkAdminOrVet, savePet)
router.put('/:petId', checkAuth, checkAdminOrVet, updatePet)
router.delete('/:petId', checkAuth, checkAdminOrVet, deletePet)
router.get('/:petId/notes', checkAuth, getNotesFromPet)
//router.post('/:petId/notes', checkAuth, addNoteToPet)
router.post('/:petId/notes', checkAuth, createNoteToPet)
router.delete('/:petId/notes/:noteId', checkAuth, deleteNoteFromPet)

exports.petRouter = router
