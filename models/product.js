const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    type: String,
    imagePreview: String,
    imageSlider: String,
    description: String,
    specifications: Object,
    price: Number,
});

module.exports = mongoose.model('products', TaskSchema);
