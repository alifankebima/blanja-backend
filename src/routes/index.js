//Combines all separated routes into a single file
const express = require('express');
const router = express.Router();

const productsRouter = require('./products');
const customersRouter = require('./customers');
const sellersRouter = require('./sellers');

router.use('/products', productsRouter);
router.use('/customers', customersRouter);
router.use('/sellers', sellersRouter);

module.exports = router;