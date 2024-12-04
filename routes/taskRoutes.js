const express = require('express')
const { addTaskValidation, updateTaskSchema} = require('../validations/taskValidators')
const authMiddleware = require('../middlewares/authMiddleware')
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/taskControllers')
const validateRequest = require('../middlewares/validationMiddleware')
const checkRole = require('../middlewares/permissionMiddleware')


const router = express.Router()

router.post('/add-task',validateRequest(addTaskValidation), authMiddleware,checkRole(['manager']), authMiddleware, addTask)
router.get('/get-tasks',authMiddleware, checkRole(['manager']), getTasks );
router.put('/update-task/:taskId', validateRequest(updateTaskSchema), authMiddleware, checkRole(['manager']), updateTask );
router.delete('/delete-task/:taskId',authMiddleware,checkRole(['manager']), deleteTask );


module.exports = router