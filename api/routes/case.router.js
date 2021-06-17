const router = require('express').Router()

const { checkAuth, checkAdminOrVet, checkAdmin } = require('../../utils/auth')
const { getAllCases, createCase, getCasebyId, deleteCase, updateCase, getAllTestInCase, addTestInCase, addTreatmentsInCase, getTreatmentsInCase, createTreatmentInCase, createTestInCase, deleteTreatmentCase, deleteTestCase } = require('../controllers/case.controller')

router.get('/', checkAuth, checkAdminOrVet, getAllCases)
router.get('/:caseId', checkAuth, checkAdminOrVet, getCasebyId)
router.get('/:caseId/tests', checkAuth, getAllTestInCase)
router.get('/:caseId/treatments', checkAuth, getTreatmentsInCase)

router.post('/', checkAuth, checkAdminOrVet, createCase)
router.post('/:caseId/tests', checkAuth, checkAdminOrVet, createTestInCase)
router.post('/:caseId/treatments', checkAuth, checkAdminOrVet, createTreatmentInCase)

router.put('/:caseId', checkAuth, checkAdminOrVet, updateCase)
router.put('/:caseId/tests', checkAuth, checkAdminOrVet, addTestInCase)
router.put('/:caseId/treatments', checkAuth, checkAdminOrVet, addTreatmentsInCase)

router.delete('/:caseId', checkAuth, checkAdmin, deleteCase)
router.delete('/:caseId/treatments/:treatmentId', checkAuth, checkAdminOrVet, deleteTreatmentCase)
router.delete('/:caseId/tests/:testId', checkAuth, checkAdminOrVet, deleteTestCase)

exports.caseRouter = router
