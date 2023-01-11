//Customer routes
const express = require('express');
const router = express.Router();
const customerController = require('./src/controller/products');

router.get('/', customerController.getProduct);
router.get('/:id', customerController.getDetailProduct);
router.post('/', customerController.createProduct);
router.put('/:id', customerController.updateProduct);
router.delete('/:id', customerController.deleteProduct);

module.exports = router;