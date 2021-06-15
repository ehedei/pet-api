const { checkAuth, checkAdminOrVet } = require('../../utils/auth')
const { getAllPets, getPetById, savePet, updatePet, deletePet, deleteNoteFromPet, getNotesFromPet, addNoteToPet, addCaseInPet, getVitalsPet, getTestsPet, createNoteToPet } = require('../controllers/pet.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdminOrVet, getAllPets)
router.get('/:petId', checkAuth, checkAdminOrVet, getPetById)
router.post('/', checkAuth, checkAdminOrVet, savePet)
router.put('/:petId', checkAuth, checkAdminOrVet, updatePet)
router.delete('/:petId', checkAuth, checkAdminOrVet, deletePet)
router.get('/:petId/notes', checkAuth, getNotesFromPet)
router.post('/:petId/notes', checkAuth, createNoteToPet)

router.post('/:petId/cases', checkAuth, checkAdminOrVet, addCaseInPet)

router.get('/:petId/vitalsigns', checkAuth, getVitalsPet)
router.get('/:petId/tests', checkAuth, getTestsPet)

router.delete('/:petId/notes/:noteId', checkAuth, deleteNoteFromPet)



exports.petRouter = router
