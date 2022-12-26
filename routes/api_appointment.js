const appointment = require('../controllers/appointment');
const express = require('express');
const { route } = require('../app/app');
const router = express.Router();

router.post('/add-new-task', appointment.createAppointment);
router.get('/get-all-task', appointment.getAllAppointment);
router.post('/filter-task-by-status', appointment.filterAppointmentByStatus);
router.put('/update-task', appointment.changeAppointment);
router.get('/get-task-by-id/:id', appointment.viewAppointment);

module.exports = router;