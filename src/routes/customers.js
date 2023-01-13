//Customers routes
const express = require('express');
const router = express.Router();
const customersController = require('../controller/customers');

router.get('/', customersController.getAllCustomer);
router.get('/:id', customersController.getDetailCustomer);
router.post('/', customersController.createCustomer);
router.put('/:id', customersController.updateCustomer);
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;