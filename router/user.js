const express = require("express");
const router = express.Router();
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

const UserController = require("../controller/user");
// const User = require("../model/user");
const userAuth = require("../midilware/userAuth");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home page
 *     tags:
 *       - user
 *     description: Returns the product list for the home page.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Product Name
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 99.99
 *                   description:
 *                     type: string
 *                     example: A brief description of the product.
 */
router.get("/", userAuth, UserController.home);

// /**
//  * @swagger
//  * /signup:
//  *   get:
//  *     summary: Retrieve the signup page
//  *     tags:
//  *       - user
//  *     description: Returns the signup page for new users to register.
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved the signup page
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Success, you got the signup page"
//  */
router.get("/signup", UserController.getSignup);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - user
 *     description: Allows a new user to register by providing their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 format: name
 *                 example: shihas
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully registered"
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.post("/signup", UserController.signup);


// /**
//  * @swagger
//  * /login:
//  *   get:
//  *     summary: Retrieve the login page
//  *     tags:
//  *       - user
//  *     description: Returns the login page for existing users.
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved the login page
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Success, you got the login page"
//  */
router.get("/login", UserController.getLogin);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in an existing user
 *     tags:
 *       - user
 *     description: Authenticates a user by their email and password and returns a JWT token if successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid credentials or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.post("/login", UserController.postLogin);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out a user
 *     tags:
 *       - user
 *     description: Logs out the current user by clearing their JWT token from cookies.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully logged out"
 */

router.post("/logout", UserController.postLogout);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retrieve user profile
 *     tags:
 *       - user
 *     description: Returns the profile information of the currently logged-in user.
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                 message:
 *                   type: string
 *                   example: "Profile retrieved successfully"
 */
router.get("/profile", UserController.getProfile);

module.exports = router;
