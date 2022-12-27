const index_home = require('../../../controllers/admin/index');
const express = require('express');
const { route } = require('../../../app/app');
const router = express.Router();

router.get('/', index_home.index);

module.exports = router;