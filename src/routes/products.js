const express = require('express');
const router = express.Router();

const productsController = require('../controller/products');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', protect, productsController.getAllProducts);
router.get('/:id', productsController.getDetailProduct);
router.post('/', upload.single('photo'), productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;