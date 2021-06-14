const { authRouter } = require('./auth.router')
const { userRouter } = require('./user.router')

const router = require('express').Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)

exports.router = router
