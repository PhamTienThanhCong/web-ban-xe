const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    service_type: Number,
    image: String
});

module.exports = mongoose.model('services', TaskSchema);
