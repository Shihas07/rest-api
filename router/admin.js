const adminController=require("../controller/admin")
const express=require("express")
const router=express.Router()
const adminAuth=require("../midilware/adminAuth")



/**
 * @swagger
 * /admin/:
 *   get:
 *     summary: Admin home page
 *     tags:
 *       - admin
 *     description: Returns the admin home page with relevant admin data.
 *     responses:
 *       200:
 *         description: Successfully retrieved the admin home page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to the admin home page"
 *                 data:
 *                   type: object
 *                   properties:
 *                     // Add specific properties of the response object if needed
 *     security:
 *       - bearerAuth: []
 */
 router.get("/", adminAuth, adminController.home);

 
  // router.get("/",adminAuth,adminController.home)


 router.get("/signup",adminController.getsignup)


/**
 * @swagger
 * /admin/signup:
 *   post:
 *     summary: Register a new admin
 *     tags:
 *       - admin
 *     description: Allows a new admin to register by providing their name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Admin Name
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd
 *     responses:
 *       201:
 *         description: Admin successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully created"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Admin Name
 *                     email:
 *                       type: string
 *                       example: admin@example.com
 *       400:
 *         description: Bad request, missing credentials or email already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing credentials"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/signup", adminController.signup);


 /**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Log in an admin
 *     tags:
 *       - admin
 *     description: Authenticates an admin by email and password and returns a JWT token if successful.
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
 *                 example: admin@example.com
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
 *       400:
 *         description: Invalid credentials or admin not found
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
 router.post("/login",adminController.postLogin)


  /**
 * @swagger
 * /admin/addProduct:
 *   post:
 *     summary: Add a new product
 *     tags:
 *       - admin
 *     description: Allows an admin to add a new product by providing name, size, and price.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product Name"
 *               size:
 *                 type: string
 *                 example: "Large"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *     responses:
 *       201:
 *         description: Product successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product successfully added"
 *       400:
 *         description: Bad request, missing credentials or product already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing credentials"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/addProduct", adminController.addProduect);


//  router.post("/addProduect",adminController.addProduect)


  /**
 * @swagger
 * /admin/listProduect:
 *   get:
 *     summary: Retrieve a list of products
 *     tags:
 *       - admin
 *     description: Fetches a list of all products from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "List retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Product Name"
 *                       size:
 *                         type: string
 *                         example: "Large"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 29.99
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

 router.get("/listProduect",adminAuth,adminController.getListProduect)


 /**
 * @swagger
 * /admin/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - admin
 *     description: Deletes a product from the database using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d4f001f6471d1"
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product successfully deleted"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */


 router.delete("/delete/:id",adminAuth,adminController.deleteProduect)

 /**
 * @swagger
 * /admin/update:
 *   patch:
 *     summary: Update an existing product
 *     tags:
 *       - admin
 *     description: Updates an existing product using its ID. Requires the product ID in query parameters and the updated fields in the request body.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d4f001f6471d1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               size:
 *                 type: string
 *                 example: "Medium"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 39.99
 *     responses:
 *       200:
 *         description: Product successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Updated Product Name"
 *                     size:
 *                       type: string
 *                       example: "Medium"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 39.99
 *       400:
 *         description: Bad request, missing ID or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product ID is required"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
 router.patch("/update",adminAuth,adminController.update)

 module.exports=router
    
 

