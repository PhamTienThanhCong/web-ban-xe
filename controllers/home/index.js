const productModel = require('../../models/product');

function login (req, res) {
    res.render('home/auth/login', {
    });
}

function register (req, res) {
    res.render('home/auth/register', {
    });
}

function index (req, res) {
    res.render('home/index', {
    });
}

function introduce(req, res){
    return res.render('home/introduce');
}
function contact(req, res){
    return res.render('home/contact');
}
function product(req, res){
    let type = req.params.type;
    let title = '';
    if (type == 'xe-may') {
        title = 'Xe máy';
    } else if (type == 'o-to') {
        title = 'Ô tô';
    }
    return res.render('home/products',{
        title: title,
        type: type
    });
}
async function view_product(req, res){
    const { id } = req.params;
    console.log(id);
    try {
        const product = await productModel.findById(id);
        return res.render('home/view_product', { product: product });
    } catch (error) {
        
    }
}

module.exports = {
    login,
    register,
    introduce,
    contact,
    product,
    view_product,
    index
}