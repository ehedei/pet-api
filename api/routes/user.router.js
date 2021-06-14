const { checkAuth, checkAdminOrVet, checkAdmin } = require('../../utils/auth')
const { getAllUsers, getUserById, getUserProfile, updateUser, deleteUser, updateProfile } = require('../controllers/user.controller')
const { signup } = require('../controllers/auth.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdminOrVet, getAllUsers)
router.get('/profile', checkAuth, getUserProfile)
router.get('/:userId', checkAuth, checkAdminOrVet, getUserById)
router.put('/update', checkAuth, updateProfile)
router.put('/:userId', checkAuth, checkAdminOrVet, updateUser)
router.post('/', checkAuth, checkAdminOrVet, signup)
router.delete('/:userId', checkAuth, checkAdmin, deleteUser)

exports.userRouter = router
