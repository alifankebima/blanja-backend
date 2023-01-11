//Route untuk proses crud products
const express = require('express');
const router = express.Router();
const productController = require('../controller/products');

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getDetailProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;