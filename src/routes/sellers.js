const express = require('express');
const router = express.Router();

const sellersController = require('../controller/sellers');
const { protect } = require('../middleware/auth');

//Authentication routes
router.post('/register', sellersController.registerSeller);
router.post('/login', sellersController.loginSeller);
router.post('/refresh-token', sellersController.refreshToken);
router.get('/profile', protect, sellersController.profile);

//Sellers CRUD routes
router.get('/', sellersController.getAllSellers);
router.get('/:id', sellersController.getDetailSeller);
router.put('/:id', sellersController.updateSeller);
router.delete('/:id', sellersController.deleteSeller);

module.exports = router;