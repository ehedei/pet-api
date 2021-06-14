const router = require('express').Router()
const { checkAuth, checkAdminOrVet, checkAdmin } = require('../../utils/auth')
const { getAllTests, createTest, getTestById, updateTestById, deleteTestById } = require('../controllers/test.controller')

router.get('/', checkAuth, checkAdminOrVet, getAllTests)
router.get('/:testId', checkAuth, checkAdminOrVet, getTestById)
router.put('/:testId', checkAuth, checkAdminOrVet, updateTestById)
router.delete('/:testId', checkAuth, checkAdminOrVet, deleteTestById)

router.post('/', checkAuth, checkAdminOrVet, createTest)

exports.testRouter = router
