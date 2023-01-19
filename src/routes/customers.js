const express = require('express');
const router = express.Router();

const customersController = require('../controller/customers');
const { protect } = require('../middleware/auth');

//Authentication routes
router.post('/register', customersController.registerCustomer);
router.post('/login', customersController.loginCustomer);
router.post('/refresh-token', customersController.refreshToken);
router.get('/profile', protect, customersController.profile);

//Customers CRUD routes
router.get('/', customersController.getAllCustomers);
router.get('/:id', customersController.getDetailCustomer);
router.put('/:id', customersController.updateCustomer);
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;