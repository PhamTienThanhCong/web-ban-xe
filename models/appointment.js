const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    customer: Object,
    type: Number,
    title: String,
    message: String,
    status: Number,
    date: String,
    time: String,
});

module.exports = mongoose.model('appointments', TaskSchema);
