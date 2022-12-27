


function index(req, res) {
    res.render('admin/index', {
        title: 'Admin',
        name: 'Admin'
    });
}

module.exports = {
    index
}