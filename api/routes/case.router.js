const router = require('express').Router()

const { checkAuth, checkAdminOrVet, checkAdmin } = require('../../utils/auth')
const { getAllCases, createCase, getCasebyId, deleteCase, updateCase, getAllTestInCase, addTestInCase, addTreatmentsInCase, getTreatmentsInCase } = require('../controllers/case.controller')

router.get('/', checkAuth, checkAdminOrVet, getAllCases)
router.get('/:caseId', getCasebyId)

router.get('/:caseId/tests', checkAuth, getAllTestInCase)
router.get('/:caseId/treatments', checkAuth, getTreatmentsInCase)

router.put('/:caseId/tests', checkAuth, checkAdminOrVet, addTestInCase)
router.put('/:caseId/treatments', checkAuth, checkAdminOrVet, addTreatmentsInCase)

router.put('/:caseId', checkAuth, checkAdminOrVet, updateCase)
router.post('/', checkAuth, checkAdminOrVet, createCase)
router.delete('/:caseId', checkAuth, checkAdmin, deleteCase)

exports.caseRouter = router
