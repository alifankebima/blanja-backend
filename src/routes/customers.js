const express = require('express');
const router = express.Router();

const customersController = require('../controller/customers');
const { protect, isCustomer } = require('../middleware/auth');

//Authentication routes
router.post('/register', customersController.registerCustomer);
router.post('/login', customersController.loginCustomer);
router.post('/refresh-token', customersController.refreshToken);
router.get('/profile', protect, customersController.profile);

//Customers CRUD routes
router.get('/', protect, isCustomer, customersController.getAllCustomers);
router.get('/:id', protect, isCustomer, customersController.getDetailCustomer);
router.put('/:id', protect, isCustomer, customersController.updateCustomer);
router.delete('/:id', protect, isCustomer, customersController.deleteCustomer);

module.exports = router;