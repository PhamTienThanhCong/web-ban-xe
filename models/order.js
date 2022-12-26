const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    customer: Object,
    orderDetails: Array,
    date: String,
    time: String
});

module.exports = mongoose.model('orders', TaskSchema);
