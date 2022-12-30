const index_home = require('../../controllers/home/index');
const express = require('express');
const { route } = require('../../app/app');
const router = express.Router();

router.get('/login', index_home.login);
router.get('/register', index_home.register);

router.get('/', index_home.index);
router.get('/gioi-thieu', index_home.introduce);
router.get('/lien-he', index_home.contact);
router.get('/san-pham/:type', index_home.product);
router.get('/xem-san-pham/:id', index_home.view_product);


module.exports = router;