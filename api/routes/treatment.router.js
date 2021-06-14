
const { getAllTreatment, getTreatmentById, createTreatment, deleteTreatment, updateTreatment } = require('../controllers/treantemnt.controller.js')

const router = require('express').Router()

router.get('/, treatment', getAllTreatment)
router.get('/:treatmentId', getTreatmentById)
router.get('/:treatment', createTreatment)
router.delete('/:treatmentId', deleteTreatment)
router.update('/treatmentid', updateTreatment)