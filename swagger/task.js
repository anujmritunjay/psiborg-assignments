/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Specify JWT format if you're using it.
 */


/**
 * @swagger
 * /tasks/update-task/{taskId}:
 *   put:
 *     tags:
 *       - Task
 *     summary: Update an existing task
 *     description: Update task details such as title, description, due date, priority, status, or assigned user.
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *           format: object-id
 *           example: 507f191e810c19729de860ea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete the project
 *               description:
 *                 type: string
 *                 example: Finish the project by the end of the month
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-31T23:59:59Z
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               status:
 *                 type: string
 *                 enum: [not started, in progress, completed]
 *               assignedTo:
 *                 type: string
 *                 format: object-id
 *                 description: The ID of the user assigned to the task
 *                 example: 507f191e810c19729de860eb
 *     responses:
 *       204:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - BearerAuth: []  # Use the BearerAuth security scheme
 */


/**
 * @swagger
 * /tasks/delete-task/{taskId}:
 *   delete:
 *     tags:
 *       - Task
 *     summary: Delete an existing task
 *     description: Delete a task by its ID.
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *           format: object-id
 *           example: 507f191e810c19729de860ea
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - BearerAuth: []  # Use the BearerAuth security scheme
 */



/**
 * @swagger
 * /tasks/add-task:
 *   post:
 *     tags:
 *       - Task
 *     summary: Create a new task
 *     description: Create a task with a title, description, due date, priority, status, and assigned user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete the project
 *               description:
 *                 type: string
 *                 example: Finish the project by the end of the month
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-31T23:59:59Z
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               status:
 *                 type: string
 *                 enum: [not started, in progress, completed]
 *                 default: not started
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 *     security:
 *       - BearerAuth: []  # Use the BearerAuth security scheme
 */


/**
 * @swagger
 * /tasks/get-tasks:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get a list of tasks
 *     description: Retrieve tasks with optional filtering, sorting, and pagination
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [not started, in progress, completed]
 *         description: Filter tasks by status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter tasks by priority
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         description: Filter tasks by user ID (assigned user)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [due_date, priority]
 *         description: Sort tasks by a field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 *     security:
 *       - BearerAuth: []  # Use the BearerAuth security scheme
 */


/**
 * @swagger
 * /tasks/assign-task/{taskId}:
 *   put:
 *     tags:
 *       - Task
 *     summary: Assign a task to a user
 *     description: Assign an existing task to a specific user by their user ID.
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: The ID of the task to assign
 *         schema:
 *           type: string
 *           format: object-id
 *           example: 507f191e810c19729de860ea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: object-id
 *                 description: The ID of the user to whom the task will be assigned.
 *                 example: 507f191e810c19729de860eb
 *     responses:
 *       200:
 *         description: Task assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: Task assigned successfully.
 *                 task:
 *                   type: object
 *                   description: The updated task details.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The task ID.
 *                       example: 507f191e810c19729de860ea
 *                     title:
 *                       type: string
 *                       description: The title of the task.
 *                       example: Complete the project
 *                     assignedTo:
 *                       type: string
 *                       description: The ID of the user to whom the task is assigned.
 *                       example: 507f191e810c19729de860eb
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates failure.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Invalid task ID or user ID.
 *       404:
 *         description: Task or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates failure.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Task not found or user not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates failure.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: Internal server error.
 *     security:
 *       - BearerAuth: []  # Use the BearerAuth security scheme
 */


/**
 * @swagger
 * /tasks/assigned:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get all assigned tasks
 *     description: Retrieve a list of tasks that are assigned to any user.
 *     responses:
 *       200:
 *         description: Successfully fetched assigned tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The task ID.
 *                       title:
 *                         type: string
 *                         description: The title of the task.
 *                       description:
 *                         type: string
 *                         description: The description of the task.
 *                       status:
 *                         type: string
 *                         enum: [not started, in progress, completed]
 *                         description: The current status of the task.
 *                       assignedTo:
 *                         type: string
 *                         description: The user ID to whom the task is assigned.
 *       500:
 *         description: Internal server error
 *     security:
 *       - BearerAuth: []  # Use the BearerAuth security scheme
 */


/**
 * @swagger
 * /tasks/analytics:
 *   get:
 *     tags:
 *       - Task
 *     summary: Get task analytics
 *     description: Retrieve analytics for tasks, including counts of completed, pending, in-progress, and overdue tasks. Optionally filter analytics for a specific user.
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: false
 *         description: The ID of the user to filter tasks by. If not provided, analytics for all tasks will be returned.
 *         schema:
 *           type: string
 *           format: object-id
 *           example: 507f191e810c19729de860ea
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 analytics:
 *                   type: object
 *                   properties:
 *                     completed:
 *                       type: integer
 *                       example: 10
 *                     pending:
 *                       type: integer
 *                       example: 15
 *                     inProgress:
 *                       type: integer
 *                       example: 7
 *                     overdue:
 *                       type: integer
 *                       example: 4
 *       400:
 *         description: Invalid user ID format.
 *       500:
 *         description: Internal server error.
 *     security:
 *       - BearerAuth: []  # Use the BearerAuth security scheme
 */
