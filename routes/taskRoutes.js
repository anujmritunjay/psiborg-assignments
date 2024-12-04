const express = require('express')
const { addTaskValidation, updateTaskSchema} = require('../validations/taskValidators')
const authMiddleware = require('../middlewares/authMiddleware')
const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/taskControllers')
const validateRequest = require('../middlewares/validationMiddleware')
const checkRole = require('../middlewares/permissionMiddleware')
const { assignTaskSchema } = require('../validations/taskValidators')
const { assignTaskToUser } = require('../controllers/taskControllers')
const { getAssignedTasks } = require('../controllers/taskControllers')
const { getTaskAnalytics } = require('../controllers/taskControllers')


const router = express.Router()

router.post('/add-task',validateRequest(addTaskValidation), authMiddleware,checkRole(['manager']), authMiddleware, addTask)
router.get('/get-tasks',authMiddleware, checkRole(['manager']), getTasks );
router.get('/assigned',authMiddleware, checkRole(['manager']), getAssignedTasks );
router.get('/analytics',authMiddleware, checkRole(['manager']), getTaskAnalytics );
router.put('/update-task/:taskId', validateRequest(updateTaskSchema), authMiddleware, checkRole(['manager']), updateTask );
router.delete('/delete-task/:taskId',authMiddleware,checkRole(['manager']), deleteTask );
router.put('/assign-task/:taskId', validateRequest(assignTaskSchema), authMiddleware, checkRole(['manager']), assignTaskToUser );


module.exports = router