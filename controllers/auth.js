const user = require('../models/user');

// register user
function register(req, res) {
    const { name, phone, gender, password } = req.body;
    // check if phone exist
    user.findOne ({ phone: phone }, (data, err) => {
        if (err) {
            res.status(500).send({ message: 'Error when register user' });
            console.log(err)
        } else {
            if (data) {
                res.status(500).send({ message: 'Phone already exist' , data: data});
            } else {
                // create new user
                const newUser = new user({
                    name: name,
                    phone: phone,
                    gender: gender,
                    role: 4,
                    password: password
                });

                try {
                    newUser.save((data, err) => {
                        if (err) {
                            // console.log(err);
                            res.status(500).send({ message: 'Error when register user' });
                        } else {
                            res.status(200).send({ message: 'Register successfully' });
                        }
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ message: 'Error when register user' });
                }
            }
        }
    });
}
//update user
function updateUser(req, res) {
    const { id } = req.params;
    const { name, phone, email, gender, birthday, photo, address, role, password } = req.body;
    // check password
    user.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error when update user' });
        } else {
            if (data) {
                // update user
                user.findByIdAndUpdate(id, {
                    name,
                    phone,
                    email,
                    gender,
                    birthday,
                    photo,
                    address,
                    role
                }, (data, err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ message: 'Error when update user' });
                    } else {
                        res.status(200).send({ message: 'Update successfully' });
                    }
                });
            } else {
                res.status(500).send({ message: 'User is not exist' });
            }
        }
    });
}

// login user
function login(req, res) {
    const { phone, password } = req.body;
    // check if phone exist
    user.findOne ({ phone: phone }, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error when login user' });
        } else {
            if (data) {
                // check password
                if (data.password === password) {
                    // create session
                    req.session.user = data;
                    res.status(200).send({ message: 'Login successfully' });
                } else {
                    res.status(500).send({ message: 'Password is incorrect' });
                }
            } else {
                res.status(500).send({ message: 'Phone is not exist' });
            }
        }
    });
}

// delete user
function deleteUser(req, res) {
    const { id } = req.params;
    try {
        user.findByIdAndDelete(id, (data, err) => {
            console.log(err);
            if (err) {
                res.status(500).send({ message: 'Error when delete user' });
            } else {
                res.status(200).send({ message: 'Delete successfully' });
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Error when delete user' });
    }
}

// logout remove session
function logout(req, res) {
    req.session.destroy();
    // res.redirect('/login');
    res.status(200).send({ message: 'Logout successfully' });
}

// test session
function test(req, res) {
    if (req.session.user) {
        res.status(200).send({ message: 'Session is exist' });
    } else {
        res.status(500).send({ message: 'Session is not exist' });
    }
}

// get list user
function getListUser(req, res) {
    user.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error when get list user' });
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports = {
    logout,
    register,
    updateUser,
    deleteUser,
    login,
    getListUser,
    test
}