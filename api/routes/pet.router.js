const { checkAuth, checkAdminOrVet, checkAdmin } = require('../../utils/auth')
const { getAllPets, getPetById, savePet, updatePet, deletePet, deleteNoteFromPet, getNotesFromPet, addCaseInPet, getVitalsPet, getTestsPet, createNoteToPet, getAllCasePet, getTreatmentsPet, createCaseInPet, addNoteToPet } = require('../controllers/pet.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdminOrVet, getAllPets)
router.get('/:petId', checkAuth, checkAdminOrVet, getPetById)
router.get('/:petId/cases', checkAuth, getAllCasePet)
router.get('/:petId/notes', checkAuth, getNotesFromPet)
router.get('/:petId/tests', checkAuth, getTestsPet)
router.get('/:petId/treatments', checkAuth, checkAdminOrVet, getTreatmentsPet)
router.get('/:petId/vitalsigns', checkAuth, getVitalsPet)

router.post('/', checkAuth, checkAdminOrVet, savePet)
router.post('/:petId/cases', checkAuth, checkAdminOrVet, createCaseInPet)
router.post('/:petId/notes', checkAuth, createNoteToPet)

router.put('/:petId', checkAuth, checkAdminOrVet, updatePet)
router.put('/:petId/cases', checkAuth, checkAdminOrVet, addCaseInPet)
router.put('/:petId/notes', checkAuth, checkAdmin, addNoteToPet)

router.delete('/:petId', checkAuth, checkAdmin, deletePet)
router.delete('/:petId/notes/:noteId', checkAuth, deleteNoteFromPet)

exports.petRouter = router
