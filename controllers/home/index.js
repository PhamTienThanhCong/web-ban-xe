
function login (req, res) {
    res.render('home/auth/login', {
    });
}

function register (req, res) {
    res.render('home/auth/register', {
    });
}


module.exports = {
    login,
    register
}