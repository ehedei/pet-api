const { login, signup } = require('../controllers/auth.controller')

const router = require('express').Router()

router.post('/login', login)
router.post('/signup', signup)

exports.authRouter = router
