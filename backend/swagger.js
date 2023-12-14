// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    info: {
      title: "api doc fullstack grup 3",
      version: "1.0.0",
      description: "berisi dokumentasi CRUD postman operasi moviesdatabase",
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
    ],
  },
  apis: ["./*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, missing or invalid input
 *       403:
 *         description: Forbidden, email or username already exists
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login as a user
 *     description: Authenticate and generate JWT for the user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       404:
 *         description: User not found
 *       403:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user details based on the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user details based on the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete user based on the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Get all products (Admin)
 *     description: Retrieve a list of all products for admin purposes.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products:
 *   post:
 *     summary: Create a new product (Admin)
 *     description: Create a new product with the provided details for admin purposes.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request, missing or invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   put:
 *     summary: Update product by ID (Admin)
 *     description: Update product details based on the provided product ID for admin purposes.
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   delete:
 *     summary: Delete product by ID (Admin)
 *     description: Delete product based on the provided product ID for admin purposes.
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/listorder:
 *   get:
 *     summary: Get a list of orders (Admin)
 *     description: Retrieve a list of orders with basic information for admin purposes.
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       salesorder_id:
 *                         type: integer
 *                       salesorder_no:
 *                         type: string
 *                       sub_total:
 *                         type: number
 *                       is_verified:
 *                         type: boolean
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/orders/{id}:
 *   get:
 *     summary: Get detailed information about a specific order (Admin)
 *     description: Retrieve detailed information about a specific order for admin purposes.
 *     tags:
 *       - Order
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detailed order information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orderDetails:
 *                   type: object
 *                   properties:
 *                     salesorder_id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     order_status:
 *                       type: string
 *                     shipping_cost:
 *                       type: number
 *                     sub_total:
 *                       type: number
 *                     is_verified:
 *                       type: boolean
 *                     image_payment:
 *                       type: string
 *                     details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *                           item:
 *                             type: object
 *                             properties:
 *                               item_name:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                     user:
 *                       type: object
 *                       properties:
 *                         full_name:
 *                           type: string
 *                         address:
 *                           type: string
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /admin/orders/{id}:
 *   put:
 *     summary: Update order status by ID (Admin)
 *     description: Update the verification status of an order based on the provided order ID for admin purposes.
 *     tags:
 *       - Order
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 updatedOrder:
 *                   type: object
 *                   properties:
 *                     salesorder_id:
 *                       type: integer
 *                     is_verified:
 *                       type: boolean
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/province:
 *   get:
 *     summary: Get list of provinces
 *     description: Retrieve a list of provinces from RajaOngkir.
 *     tags:
 *       - Shipment Cost
 *     responses:
 *       200:
 *         description: List of provinces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   province_id:
 *                     type: string
 *                   province:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/city:
 *   get:
 *     summary: Get list of cities by province
 *     description: Retrieve a list of cities in a specific province from RajaOngkir.
 *     tags:
 *       - Shipment Cost
 *     parameters:
 *       - name: province
 *         in: query
 *         description: Province ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cities in the specified province
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   city_id:
 *                     type: string
 *                   city_name:
 *                     type: string
 *       400:
 *         description: Bad request, missing province ID
 *       404:
 *         description: Province not found or server error
 */

/**
 * @swagger
 * /api/cost:
 *   post:
 *     summary: Calculate shipment cost
 *     description: Calculate the shipment cost using RajaOngkir API.
 *     tags:
 *       - Shipment Cost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               weight:
 *                 type: number
 *               courier:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shipment cost calculation result
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
 *                     type: object
 *                     properties:
 *                       service:
 *                         type: string
 *                       description:
 *                         type: string
 *                       cost:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             value:
 *                               type: number
 *                             etd:
 *                               type: string
 *                             note:
 *                               type: string
 *       400:
 *         description: Bad request, missing required parameters
 *       404:
 *         description: Error calculating shipping cost or server error
 */

/**
 * @swagger
 * /api/users/admin/register:
 *   post:
 *     summary: Register a new admin user
 *     description: Register a new admin user with the provided details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               province_id:
 *                 type: string
 *               city_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad request, missing or invalid input
 *       403:
 *         description: Forbidden, email or username already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/warehouses:
 *   get:
 *     summary: Get all warehouses
 *     description: Retrieve a list of all warehouses.
 *     tags:
 *       - Warehouse
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of warehouses
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/warehouses/{id}:
 *   get:
 *     summary: Get warehouse by ID
 *     description: Retrieve warehouse details based on the provided warehouse ID.
 *     tags:
 *       - Warehouse
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Warehouse ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Warehouse details
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/warehouses:
 *   post:
 *     summary: Create a new warehouse
 *     description: Create a new warehouse with the provided details.
 *     tags:
 *       - Warehouse
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               city_id:
 *                 type: integer
 *               province_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 *       400:
 *         description: Bad request, missing or invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/warehouses/{id}:
 *   put:
 *     summary: Update warehouse by ID
 *     description: Update warehouse details based on the provided warehouse ID.
 *     tags:
 *       - Warehouse
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Warehouse ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               city_id:
 *                 type: integer
 *               province_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/warehouses/{id}:
 *   delete:
 *     summary: Delete warehouse by ID
 *     description: Delete warehouse based on the provided warehouse ID.
 *     tags:
 *       - Warehouse
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Warehouse ID
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Warehouse deleted successfully
 *       404:
 *         description: Warehouse not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of products with optional filtering and pagination.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number for pagination (default is 1)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: item_name
 *         description: Filter products by name
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         description: Filter products by price
 *         schema:
 *           type: number
 *       - in: query
 *         name: rating
 *         description: Filter products by minimum rating
 *         schema:
 *           type: number
 *       - in: query
 *         name: sort
 *         description: Sort products by a specific criteria (e.g., "price asc")
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item_id:
 *                         type: integer
 *                       item_name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       description:
 *                         type: string
 *                       color:
 *                         type: string
 *                       package_weight:
 *                         type: number
 *                       stock_item:
 *                         type: integer
 *                       summary_rating:
 *                         type: number
 *                       warehouse_city:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                 page:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/search/{name}:
 *   get:
 *     summary: Search products by name
 *     description: Retrieve products that contain the specified name.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: name
 *         description: The name to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productByName:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       item_id:
 *                         type: integer
 *                       item_name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       description:
 *                         type: string
 *                       color:
 *                         type: string
 *                       package_weight:
 *                         type: number
 *                       stock_item:
 *                         type: integer
 *                       summary_rating:
 *                         type: number
 *                       warehouse_city:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve details of a specific product based on the provided product ID.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productById:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                     item_name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     description:
 *                       type: string
 *                     color:
 *                       type: string
 *                     package_weight:
 *                       type: number
 *                     stock_item:
 *                       type: integer
 *                     summary_rating:
 *                       type: number
 *                     warehouse_city:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/{id}/feedback:
 *   post:
 *     summary: Create feedback for a product
 *     description: Create feedback for a specific product based on the provided product ID.
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createFeedback:
 *                   type: object
 *                   properties:
 *                     feedback_id:
 *                       type: integer
 *                     item_id:
 *                       type: integer
 *                     rating:
 *                       type: number
 *                     description:
 *                       type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/province:
 *   get:
 *     summary: Get list of provinces from RajaOngkir
 *     description: Retrieve a list of provinces from RajaOngkir.
 *     tags:
 *       - ShipmentCost
 *     responses:
 *       200:
 *         description: List of provinces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   province_id:
 *                     type: string
 *                   province:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/city:
 *   get:
 *     summary: Get list of cities by province from RajaOngkir
 *     description: Retrieve a list of cities in a specific province from RajaOngkir.
 *     tags:
 *       - ShipmentCost
 *     parameters:
 *       - name: province
 *         in: query
 *         description: Province ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cities in the specified province
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   city_id:
 *                     type: string
 *                   city_name:
 *                     type: string
 *       400:
 *         description: Bad request, missing province ID
 *       404:
 *         description: Province not found or server error
 */

/**
 * @swagger
 * /api/cost:
 *   post:
 *     summary: Calculate shipment cost using RajaOngkir API
 *     description: Calculate the shipment cost using RajaOngkir API.
 *     tags:
 *       - ShipmentCost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               weight:
 *                 type: number
 *               courier:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shipment cost calculation result
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
 *                     type: object
 *                     properties:
 *                       service:
 *                         type: string
 *                       description:
 *                         type: string
 *                       cost:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             value:
 *                               type: number
 *                             etd:
 *                               type: string
 *                             note:
 *                               type: string
 *       400:
 *         description: Bad request, missing required parameters
 *       404:
 *         description: Error calculating shipping cost or server error
 */

/**
 * @swagger
 * /api/payment_proof/{salesorder_id}:
 *   put:
 *     summary: Upload payment proof
 *     description: Upload payment proof for a specific sales order.
 *     tags: 
 *       - Customer
 *     parameters:
 *       - name: salesorder_id
 *         in: path
 *         description: Sales Order ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Payment proof uploaded successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/recieved/{salesorder_id}:
 *   put:
 *     summary: Update product status to received
 *     description: Update the product status to received for a specific sales order.
 *     tags: 
 *       - Customer
 *     parameters:
 *       - name: salesorder_id
 *         in: path
 *         description: Sales Order ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product status updated to received successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/cart/checkout:
 *   post:
 *     summary: Create order from cart
 *     description: Create an order from the user's cart.
 *     tags: 
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               salesorder_no:
 *                 type: string
 *               order_status:
 *                 type: string
 *               customer_name:
 *                 type: string
 *               shipping_cost:
 *                 type: number
 *               sub_total:
 *                 type: number
 *               orderDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                     item_price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/createcart:
 *   post:
 *     summary: Create cart for a user
 *     description: Create a cart for a user based on the provided userId.
 *     tags: 
 *       - Customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       400:
 *         description: Bad request, missing or invalid userId
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/itemcart:
 *   post:
 *     summary: Add items to cart
 *     description: Add items to the user's cart based on the provided userId and itemIds.
 *     tags: 
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               itemIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Cart items added successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get cart items by userId
 *     description: Retrieve the items in the user's cart based on the provided userId.
 *     tags: 
 *       - Customer
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of items in the cart
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/verified/{salesorder_id}:
 *   put:
 *     summary: Mark order as verified
 *     description: Mark a specific sales order as verified.
 *     tags: 
 *       - Customer
 *     parameters:
 *       - name: salesorder_id
 *         in: path
 *         description: Sales Order ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order marked as verified successfully
 *       500:
 *         description: Internal server error
 */
