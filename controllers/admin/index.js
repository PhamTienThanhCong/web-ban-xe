const order = require('../../models/order');

function index(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }
    // if user don't have image, set default image
    return res.render('admin/index', {
        user: user
    });
}

function appointment(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }
    // if user don't have image, set default image
    return res.render('admin/appointment', {
        user: user
    });
}

function createCustomer(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }

    return res.render('admin/createCustomer', {
        user: user
    });
}

function createNhanVien(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }

    return res.render('admin/createNhanVien', {
        user: user
    });
}

function createOrder(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }

    return res.render('admin/createOrder', {
        user: user
    });
}

function viewOrder(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }

    const id = req.params.id;

    try {
        order.findById(id, (err, data) => {
            if (err) {
                res.json({ status: 500, message: "L???y th??ng tin ????n h??ng th???t b???i!" });
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
                return res.render('admin/viewOrder', {
                    user: user,
                    order: data2
                });
            }
        });
    } catch (error) {
        res.json({ status: 500, message: "L???y th??ng tin ????n h??ng th???t b???i!" });
    }
}

function orderList (req, res) {
    // get user from session
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }
    if (user.role == 3){
        return res.redirect('/admin/them-don-hang');
    }
    return res.render('admin/orderList', {
        user: user,
    });
}

function userList (req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }
    if (user.role == 3){
        return res.redirect('/admin');
    }
    return res.render('admin/list_user', {
        user: user,
        title: "Qu???n l?? ng?????i d??ng",
        role: 4
    });
}

function nhanvienList (req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }
    if (user.role == 3){
        return res.redirect('/admin');
    }
    return res.render('admin/list_user', {
        user: user,
        title: "Qu???n l?? nh??n vi??n",
        role: 3
    });
}

function serviceList(req, res) {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }
    if (user.role == 3){
        return res.redirect('/admin');
    }
    return res.render('admin/serviceList', {
        user: user
    });
    
}

function createProduct(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }
    if (user.role == 3){
        return res.redirect('/admin');
    }
    return res.render('admin/createProduct', {
        user: user
    });
}

function productList(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    if (user.role == 4){
        return res.redirect('/login');
    }
    if (user.role == 3){
        return res.redirect('/admin');
    }
    return res.render('admin/productList', {
        user: user
    });
}


module.exports = {
    index,
    createCustomer,
    appointment,
    createOrder,
    viewOrder,
    orderList,
    nhanvienList,
    createNhanVien,
    serviceList,
    createProduct,
    userList,
    productList
}