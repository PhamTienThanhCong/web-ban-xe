
function index(req, res) {
    // get user from session
    const user = req.session.user;
    if (!user) {
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
    // if user don't have image, set default image
    return res.render('admin/appointment', {
        user: user
    });
}

module.exports = {
    index,
    appointment
}