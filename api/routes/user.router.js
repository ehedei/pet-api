const { checkAuth, checkAdminOrVet, checkAdmin } = require('../../utils/auth')
const { getAllUsers, getUserById, getUserProfile, updateUser, deleteUser, updateProfile, addPetToUser } = require('../controllers/user.controller')
const { signup } = require('../controllers/auth.controller')

const router = require('express').Router()

router.get('/', checkAuth, checkAdminOrVet, getAllUsers)
router.get('/profile', checkAuth, getUserProfile)
router.get('/:userId', checkAuth, checkAdminOrVet, getUserById)
router.post('/', checkAuth, checkAdminOrVet, signup)
router.post('/pets', checkAuth, addPetToUser)
router.put('/update', checkAuth, updateProfile)
router.put('/:userId', checkAuth, checkAdmin, updateUser)
router.delete('/:userId', checkAuth, checkAdmin, deleteUser)

exports.userRouter = router
