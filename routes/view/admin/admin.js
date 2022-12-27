const index_home = require('../../../controllers/admin/index');
const express = require('express');
const { route } = require('../../../app/app');
const router = express.Router();

router.get('/', index_home.index);
router.get('/quan-ly-lich-hen', index_home.appointment);

module.exports = router;