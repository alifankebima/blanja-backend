//Combines all separated routes into a single file
const express = require('express');
const router = express.Router();
const productRouter = require('./products');

router.use('/products', productRouter);

module.exports = router;