/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
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
 * /auth/sign-up:
 *   post:
 *     summary: User Sign Up
 *     tags: [Auth]
 *     description: Register a new user with username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Password123!
 *               role:
 *                 type: string
 *                 description: The role of the user.
 *                 example: admin
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: johndoe1
 *                     email:
 *                       type: string
 *                       example: johndoe@example1.com
 *                     role:
 *                       type: string
 *                       example: admin
 *                     team:
 *                       type: string
 *                       example: user
 *                     _id:
 *                       type: string
 *                       example: 67502c55d7049fa0d198b6ee
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-04T10:17:57.871Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-04T10:17:57.871Z
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error.
 */


/**
 * @swagger
 * /auth/log-in:
 *   post:
 *     summary: User Log In
 *     tags: [Auth]
 *     description: Authenticate a user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the login was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Message confirming the login.
 *                   example: Login successful.
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 user:
 *                   type: object
 *                   description: Information about the authenticated user.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user's ID.
 *                       example: 67502c55d7049fa0d198b6ee
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *                       example: johndoe
 *                     role:
 *                       type: string
 *                       description: The user's role.
 *                       example: admin
 *       400:
 *         description: Invalid credentials or validation error.
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
 *                   example: Invalid username or password.
 *       500:
 *         description: Internal server error.
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
 */


/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get Current User
 *     tags: [Auth]
 *     description: Retrieve the authenticated user's details.
 *     security:
 *       - BearerAuth: []  # This indicates that a Bearer token is required
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       401:
 *         description: Unauthorized access.
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User Logout
 *     tags: [Auth]
 *     description: Invalidate the user's JWT token to log out the user securely.
 *     security:
 *       - BearerAuth: []  # This indicates that a Bearer token is required
 *     responses:
 *       200:
 *         description: Logout successful. The JWT token has been invalidated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User logged out successfully.
 *       401:
 *         description: Unauthorized. Token is invalid or expired.
 */