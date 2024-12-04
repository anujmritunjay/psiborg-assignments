const express = require('express')
const authRouter = require('./../routes/authRoutes')
const taskRoutes = require('./../routes/taskRoutes')


const router = express.Router()

router.use('/auth', authRouter)
router.use('/tasks', taskRoutes)



module.exports = router