//File untuk mengumpulkan semua routing

const express = require('express');
const router = express.Router();
const productRouter = require('./products');

router.use('/products', productRouter);

module.exports = router;