const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    type: Object,
    description: Object,
    specifications: Object,
    price: Number,
});

module.exports = mongoose.model('products', TaskSchema);
