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
