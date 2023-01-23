const express = require('express');
const router = express.Router();

const sellersController = require('../controller/sellers');
const { protect, isSeller } = require('../middleware/auth');

//Authentication routes
router.post('/register', sellersController.registerSeller);
router.post('/login', sellersController.loginSeller);
router.post('/refresh-token', sellersController.refreshToken);
router.get('/profile', protect, sellersController.profile);

//Sellers CRUD routes
router.get('/', protect, isSeller, sellersController.getAllSellers);
router.get('/:id', protect, isSeller, sellersController.getDetailSeller);
router.put('/:id', protect, isSeller, sellersController.updateSeller);
router.delete('/:id', protect, isSeller, sellersController.deleteSeller);

module.exports = router;