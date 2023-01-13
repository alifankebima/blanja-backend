//Seller routes
const express = require('express');
const router = express.Router();
const sellersController = require('../controller/sellers');

router.get('/', sellersController.getAllSeller);
router.get('/:id', sellersController.getDetailSeller);
router.post('/', sellersController.createSeller);
router.put('/:id', sellersController.updateSeller);
router.delete('/:id', sellersController.deleteSeller);

module.exports = router;