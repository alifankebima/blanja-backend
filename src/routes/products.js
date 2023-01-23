const express = require('express');
const router = express.Router();

const productsController = require('../controller/products');
const { protect, isSeller } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getDetailProduct);
router.post('/', protect, isSeller, upload.single('photo'), productsController.createProduct);
router.put('/:id', protect, isSeller, upload.single('photo'), productsController.updateProduct);
router.delete('/:id', protect, isSeller, productsController.deleteProduct);

module.exports = router;