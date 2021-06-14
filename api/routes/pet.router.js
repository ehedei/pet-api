const { checkAuth, checkAdminOrVet } = require('../../utils/auth')
const { getAllPets, getPetById, savePet, updatePet, deletePet } = require('../controllers/pet.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdminOrVet, getAllPets)
router.get('/:petId', checkAuth, checkAdminOrVet, getPetById)
router.post('/', checkAuth, checkAdminOrVet, savePet)
router.put('/:petId', checkAuth, checkAdminOrVet, updatePet)
router.delete('/:petId', checkAuth, checkAdminOrVet, deletePet)

exports.petRouter = router
