const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    banner: String
});

module.exports = mongoose.model('settings', TaskSchema);
