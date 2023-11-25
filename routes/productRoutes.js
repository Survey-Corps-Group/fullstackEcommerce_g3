const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/search/:name', productController.searchByName);
router.post('/admin/products', upload.array("images", 5), productController.addProduct);
router.put('/admin/products/:itemId', upload.array("images", 5), productController.editProduct);
router.delete('/admin/products/:id', productController.deleteProduct);

module.exports = router;
