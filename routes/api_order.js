const order = require('../controllers/order');
const express = require('express');
const { route } = require('../app/app');
const router = express.Router();

router.post('/create', order.createOrder);
router.get('/all', order.getAllOrder);
router.delete('/delete/:id', order.deleteOrderById);
router.get('/view/:id', order.viewOrder);

module.exports = router;
