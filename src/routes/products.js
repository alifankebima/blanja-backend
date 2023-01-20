const express = require('express');
const router = express.Router();

const productsController = require('../controller/products');
const { protect, valSeller } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getDetailProduct);
router.post('/', protect, valSeller, upload.single('photo'), productsController.createProduct);
router.put('/:id', protect, valSeller, upload.single('photo'), productsController.updateProduct);
router.delete('/:id', protect, valSeller, productsController.deleteProduct);

module.exports = router;