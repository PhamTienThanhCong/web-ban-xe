const order = require('../models/order');
const customer = require('../models/user');
const service = require('../models/service');
const product = require('../models/product');

// create new order
async function createOrder(req, res) {
    const { name, phone, id_services, type } = req.body;
    let orderDetail = [];
    // chuyển id_services thành mảng
    let id_services_array = id_services.split(',');
    if (type == 1){
        // nếu là xe
        // lấy thông tin của product
        let productInfo = await product.findOne({ _id: id_services_array[0] });
        orderDetail.push(productInfo);
    }else{
        // nếu là dịch vụ
        // lấy tất cả service theo id_services_array
        for (let i = 0; i < id_services_array.length; i++) {
            let serviceInfo = await service.findById( id_services_array[i] );
            orderDetail.push({
                "name": serviceInfo.name,
                "price": serviceInfo.price,
                "description": serviceInfo.description
            });
        }
    }
    // lấy thông tin của customer
    let my_customer = await customer.findOne({ phone: phone });

    let customerInfo = {};

    if (!my_customer) {
        customerInfo = {
            name: name,
            phone: phone,
        }
    }else{
        customerInfo = {
            "id": my_customer._id,
            "name": my_customer.name,
            "phone": my_customer.phone,
            "email": my_customer.email,
            "address": my_customer.address,
            "gender": my_customer.gender
        }
    }
    
    // lấy ngày giờ hiện tại theo timezone của việt nam
    let now = new Date();
    let nowDate = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    let nowTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    const newOrder = new order({
        customer: customerInfo,
        orderDetails: orderDetail,
        date: nowDate,
        time: nowTime
    });

    try {
        newOrder.save( (data, err) => { 
            if (err) {
                res.json({ status: 500, message: "tạo đơn hàng thất bại!" });
            } else {
                res.json({ status: 200, message: 'Tạo đơn hàng thành công!', id: newOrder._id });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// get all order
async function getAllOrder(req, res) {
    try {
        order.find({}, (err, data) => {
            if (err) {
                res.json({ status: 500, message: "Lấy danh sách đơn hàng thất bại!" });
            } else {
                res.json({ status: 200, message: 'Lấy danh sách đơn hàng thành công!', data: data });
            }
        });
    } catch (error) {
        console.log(error);
    }
}
// get order by day 
async function getOrderDay(req, res) {
    const { date } = req.body;
    try {
        order
            .find({ date: date })
            .exec((err, data) => {
                if (err) {
                    res.json({ status: 500, message: "Lấy danh sách đơn hàng thất bại!" });
                } else {
                    res.json({ status: 200, message: 'Lấy danh sách đơn hàng thành công!', data: data });
                }
            });
    } catch (error) {
        console.log(error);
    }
}

// delete order by id
async function deleteOrderById(req, res) {
    const { id } = req.params;
    try {
        order.findByIdAndDelete(id, (data, err) => {
            if (err) {
                res.json({ status: 500, message: "Xóa đơn hàng thất bại!" });
            } else {
                res.json({ status: 200, message: 'Xóa đơn hàng thành công!'});
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// view order
async function viewOrder(req, res) {
    const { id } = req.params;
    try {
        order.findById(id, (err, data) => {
            if (err) {
                res.json({ status: 500, message: "Lấy thông tin đơn hàng thất bại!" });
            } else {
                let orderDetail = data.orderDetails;
                let total = 0;
                for (let i = 0; i < orderDetail.length; i++) {
                    total += orderDetail[i].price;
                }

                let data2 = {
                    "_id": data._id,
                    "customer": data.customer,
                    "orderDetails": data.orderDetails,
                    "date": data.date,
                    "time": data.time,
                    "total": total
                }

                res.json({ status: 200, message: 'Lấy thông tin đơn hàng thành công!', data: data2 });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    deleteOrderById,
    getOrderDay,
    viewOrder
}