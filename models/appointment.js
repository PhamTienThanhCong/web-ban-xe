const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    customer: Object,
    type: Number,
    product: Object,
    title: String,
    message: String,
    status: Number,
    date: Date,
});

module.exports = mongoose.model('appointments', TaskSchema);
