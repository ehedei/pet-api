const { authRouter } = require('./auth.router')
const { treatmentRouter } = require('./treatment.router')
const { testRouter } = require('./test.router')
const { noteRouter } = require('./note.router')
const { petRouter } = require('./pet.router')
const { userRouter } = require('./user.router')
const { caseRouter } = require('./case.router')

const router = require('express').Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/treatments', treatmentRouter)
router.use('/tests', testRouter)
router.use('/pets', petRouter)
router.use('/notes', noteRouter)
router.use('/cases', caseRouter)

exports.router = router
