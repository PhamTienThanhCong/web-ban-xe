const product = require('../models/product');

// create new product
function createAction(req, res) {
    const { name, type, description, imagePreview, imageSlider, price, chieu_dai_tong_the, chieu_rong_tong_the, chieu_cao_tong_the, do_cao_yen,
        khoang_cach_gam, trong_luong, dong_co, duong_kinh_piston, cong_suat, momen_xoan, cung_cap_nhien_lieu } = req.body;

    let specifications = {
        chieu_dai_tong_the: chieu_dai_tong_the,
        chieu_rong_tong_the: chieu_rong_tong_the, 
        chieu_cao_tong_the: chieu_cao_tong_the, 
        do_cao_yen: do_cao_yen,
        khoang_cach_gam: khoang_cach_gam,
        trong_luong: trong_luong,
        dong_co: dong_co,
        duong_kinh_piston: duong_kinh_piston,
        cong_suat: cong_suat,
        momen_xoan: momen_xoan,
        cung_cap_nhien_lie: cung_cap_nhien_lieu

    }
    
    const newProduct = new product({
        name: name,
        type: type,
        imagePreview: imagePreview,
        imageSlider: imageSlider,
        description: description,
        specifications: specifications,
        price: price,
    });
    try {
        newProduct.save((err, data) => {
            // chuyển sang trang khác  
            return res.redirect('/admin/them-san-pham');
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error when creating product'
        });
    }
}

async function productList(req, res){
    // lấy tất cả product
    try {
        const ListProducts = await product.find();
        res.status(200).json({ message: "Get all service successfully", data: ListProducts });
    } catch (error) {
        res.status(500).json({ message: "Get all service failed" });
    }

}

module.exports = {
    createAction,
    productList
}