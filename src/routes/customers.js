const express = require('express');
const router = express.Router();

const customersController = require('../controller/customers');
const { protect, valCustomer } = require('../middleware/auth');

//Authentication routes
router.post('/register', customersController.registerCustomer);
router.post('/login', customersController.loginCustomer);
router.post('/refresh-token', customersController.refreshToken);
router.get('/profile', protect, customersController.profile);

//Customers CRUD routes
router.get('/', protect, valCustomer, customersController.getAllCustomers);
router.get('/:id', protect, valCustomer, customersController.getDetailCustomer);
router.put('/:id', protect, valCustomer, customersController.updateCustomer);
router.delete('/:id', protect, valCustomer, customersController.deleteCustomer);

module.exports = router;