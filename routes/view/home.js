const index_home = require('../../controllers/home/index');
const express = require('express');
const { route } = require('../../app/app');
const router = express.Router();

router.get('/login', index_home.login);
router.get('/register', index_home.register);

module.exports = router;