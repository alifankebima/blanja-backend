//Products routes
const express = require('express');
const router = express.Router();
const productsController = require('../controller/products');

router.get('/', productsController.getAllProduct);
router.get('/:id', productsController.getDetailProduct);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;