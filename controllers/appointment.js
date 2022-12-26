const appointment = require('../models/appointment');
const user = require('../models/user');

// create new appointment
async function createAppointment(req, res) {
    let { id, name, phone, type, title, message, date } = req.body;

    if (name){
        name = name.trim();
    }else{
        name = "Khách hành ẩn danh";
    }
    if (phone){
        phone = phone.trim();
    }else{
        if ( !id ){
            res.status(500).json({ message: "Phone is required" });
            return;
        }
    }
    if (!id) {
        customer = {
            name : name,
            phone : phone
        }; 
    }else{
        customer = await user.findById(id);
        // hidden password
        customer.password = "********";
    }
    const newAppointment = new appointment({
        customer,
        type,
        title,
        message,
        status: "1",
        date
    });
    try {
        // save appointment
        newAppointment.save((data, err) => {
            if (err) {
                res.status(500).json({ message: "Appointment created failed" });
            } else {
                res.status(200).json({ message: "Appointment created successfully" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Appointment created failed" });
    }
}  

// get all appointment
async function getAllAppointment(req, res) {
    try {
        // const appointments = await appointment.find();
        // lấy tất cả các appointment loại bỏ status = 0 (đã xóa) và sắp xếp theo thời gian
        const appointments = await appointment.find({ status: { $ne: "0" } }).sort({ date: -1 });
        res.status(200).json({ message: "Get all appointment successfully", data: appointments });
    } catch (error) {
        res.status(500).json({ message: "Get all appointment failed" });
    }
}

// filter appointment by status
async function filterAppointmentByStatus(req, res) {
    let { status } = req.body;
    try {
        const appointments = await appointment.find({ status: status }).sort({ date: -1 });;
        res.status(200).json({ message: "Get all appointment successfully", data: appointments, Number: appointments.length });
    } catch (error) {
        res.status(500).json({ message: "Get all appointment failed" });
    }
}

// change status of appointment
async function changeAppointment(req, res) {
    let { id, type, title, message, status, date, time } = req.body;
    try {
        const old_appointment = await appointment.findById(id);
        if (type == null) {
            type = old_appointment.type;
        }
        if (title == null) {
            title = old_appointment.title;
        }
        if (message == null) {
            message = old_appointment.message;
        }
        if (status == null) {
            status = old_appointment.status;
        }
        if (date == null) {
            date = old_appointment.date;
        }
        if (time == null) {
            time = old_appointment.time;
        }
        appointment.findByIdAndUpdate (id, { type, title, message, status, date, time }, (data, err) => {
            if (err) {
                res.status(500).json({ message: "Change status appointment failed" });
            } else {
                res.status(200).json({ message: "Change status appointment successfully" });
            }
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Change status appointment failed" });
    }
}

// view appointment
async function viewAppointment(req, res) {
    let { id } = req.params;
    try {
        const old_appointment = await appointment.findById (id);
        res.status(200).json({ message: "View appointment successfully", data: old_appointment });
    } catch (error) {
        res.status(500).json({ message: "View appointment failed" });
    }
}

module.exports = {
    createAppointment,
    getAllAppointment,
    filterAppointmentByStatus,
    viewAppointment,
    changeAppointment
}