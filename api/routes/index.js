const { authRouter } = require('./auth.router')
const { petRouter } = require('./pet.router')
const { userRouter } = require('./user.router')

const router = require('express').Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/pets', petRouter)

exports.router = router
