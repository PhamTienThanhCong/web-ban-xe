const index_home = require('../../../controllers/admin/index');
const express = require('express');
const { route } = require('../../../app/app');
const router = express.Router();

router.get('/', index_home.index);
router.get('/quan-ly-lich-hen', index_home.appointment);
router.get('/tao-tai-khoan-khach', index_home.createCustomer);
router.get('/tao-tai-khoan-nhan-vien', index_home.createNhanVien);
router.get("/them-don-hang", index_home.createOrder);
router.get("/quan-ly-don-hang/xem/:id", index_home.viewOrder);
router.get("/quan-ly-don-hang", index_home.orderList);

router.get('/danh-sach-nguoi-dung', index_home.userList);
router.get('/danh-sach-nhan-vien', index_home.nhanvienList);

router.get('/quan-ly-dich-vu' , index_home.serviceList);

module.exports = router;