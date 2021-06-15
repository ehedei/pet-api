const { authRouter } = require('./auth.router')
const { treatmentRouter } = require('./treatment.router')
const { userRouter } = require('./user.router')

const router = require('express').Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/treatments', treatmentRouter)

exports.router = router
