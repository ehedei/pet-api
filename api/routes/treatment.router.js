
const { checkAdmin, checkAdminOrVet, checkAuth } = require('../../utils/auth.js')
const { getAllTreatments, createTreatment } = require('../controllers/treatment.controller')
const { getTreatmentById } = require('../controllers/treatment.controller')
const { updateTreatment } = require('../controllers/treatment.controller')
const { deleteTreatment } = require('../controllers/treatment.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdminOrVet, getAllTreatments)
router.get('/:treatmentId', checkAuth, checkAdminOrVet, getTreatmentById)

router.post('/', checkAuth, checkAdminOrVet, createTreatment)

router.put('/:treatmentId', checkAuth, checkAdminOrVet, updateTreatment)

router.delete('/:treatmentId', checkAuth, checkAdmin, deleteTreatment)

exports.treatmentRouter = router
