const express = require('express');
const router = express.Router();

const sellersController = require('../controller/sellers');
const { protect, valSeller } = require('../middleware/auth');

//Authentication routes
router.post('/register', sellersController.registerSeller);
router.post('/login', sellersController.loginSeller);
router.post('/refresh-token', sellersController.refreshToken);
router.get('/profile', protect, sellersController.profile);

//Sellers CRUD routes
router.get('/', protect, valSeller, sellersController.getAllSellers);
router.get('/:id', protect, valSeller, sellersController.getDetailSeller);
router.put('/:id', protect, valSeller, sellersController.updateSeller);
router.delete('/:id', protect, valSeller, sellersController.deleteSeller);

module.exports = router;