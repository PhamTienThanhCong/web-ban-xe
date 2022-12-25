const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    customer: Object,
    orderDetails: Array,
    time: Date
});

module.exports = mongoose.model('orders', TaskSchema);
