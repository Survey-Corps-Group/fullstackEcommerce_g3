const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const productController = require('../controllers/productController')
const { authenticateTokenMiddleware, authorizeAdmin, authorizeUser } = require('../config/middleware')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.get('/search/:name', productController.searchByName)
router.post('/', authenticateTokenMiddleware, authorizeAdmin, upload.array("images", 5), productController.addProduct)
router.put('/:itemId', authenticateTokenMiddleware, authorizeAdmin, upload.array("images", 5), productController.editProduct)
router.delete('/:id', authenticateTokenMiddleware, authorizeAdmin, productController.deleteProduct)

module.exports = router
