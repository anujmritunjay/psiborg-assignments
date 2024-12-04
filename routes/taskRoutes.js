const express = require('express')
const { addTaskValidation, updateTaskSchema} = require('../validations/taskValidators')
const authMiddleware = require('../middlewares/authMiddleware')
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/taskControllers')
const validateRequest = require('../middlewares/validationMiddleware')
const checkRole = require('../middlewares/permissionMiddleware')


const router = express.Router()

router.post('/add-task',validateRequest(addTaskValidation), authMiddleware,checkRole(['manager']), authMiddleware, addTask)
router.get('/get-tasks',authMiddleware, getTasks );
router.put('/update-task/:taskId',authMiddleware, validateRequest(updateTaskSchema), updateTask );
router.delete('/delete-task/:taskId',authMiddleware, deleteTask );


module.exports = router