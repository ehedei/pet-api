
const { checkAdmin, checkAdminOrVet, checkAuth } = require('../../utils/auth.js')
const { getAllTreatments, createTreatment } = require('../controllers/treatment.controller')
const { getTreatmentById } = require('../controllers/treatment.controller')
const { updateTreatment } = require('../controllers/treatment.controller')
const { deleteTreatment } = require('../controllers/treatment.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdminOrVet, getAllTreatments)
router.post('/', checkAuth, checkAdminOrVet, createTreatment)
router.get('/:treatmentId', checkAuth, checkAdminOrVet, getTreatmentById)
router.delete('/:treatmentId', checkAuth, checkAdmin, deleteTreatment)
router.put('/:treatmentId', checkAuth, checkAdminOrVet, updateTreatment)

exports.treatmentRouter = router
