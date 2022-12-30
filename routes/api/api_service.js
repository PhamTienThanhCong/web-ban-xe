const service = require('../../controllers/service');
const createA = require('../../controllers/product');
const express = require('express');
const { route } = require('../../app/app');
const router = express.Router();

router.post('/add-new-service', service.createService);
router.get('/get-all-service', service.getAllService);
router.get('/get-service-by-id/:id', service.getServiceById);
router.put('/update-service', service.updateService);
router.delete('/delete-service/:id', service.deleteService);

router.post('/add-new-product', createA.createAction);
router.get('/productList', createA.productList);

module.exports = router;