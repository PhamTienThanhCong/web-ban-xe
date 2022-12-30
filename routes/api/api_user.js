const auth = require('../../controllers/auth');
const express = require('express');
const { route } = require('../../app/app');
const router = express.Router();

router.get('/', auth.test);
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.delete('/delete/:id', auth.deleteUser);
router.put('/updateUser/:id', auth.updateUser);
router.get('/list/:role', auth.getListUser);
router.get('/view/:id', auth.viewUser);
router.get('/all', auth.getAllUser);
router.post('/new-account', auth.createAccount);

module.exports = router;