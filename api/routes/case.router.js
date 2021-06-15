const router = require('express').Router()

const { checkAuth, checkAdminOrVet, checkAdmin } = require('../../utils/auth')
const { getAllCases, createCase, getCasebyId, deleteCase, updateCase, getAllTestInCase, addTestInCase } = require('../controllers/case.controller')



router.get('/', checkAuth, checkAdminOrVet, getAllCases)
router.get('/:caseId', getCasebyId)

router.get('/:caseId/tests', checkAuth, getAllTestInCase)
router.post('/:caseId/tests', checkAuth, checkAdminOrVet, addTestInCase)


router.put('/:caseId', checkAuth, checkAdminOrVet, updateCase)
router.post('/', checkAuth, checkAdminOrVet, createCase)
router.delete('/:caseId', checkAuth, checkAdmin, deleteCase)

exports.caseRouter = router