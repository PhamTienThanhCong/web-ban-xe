const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  gender: Number,
  birthday: String,
  photo: String,
  address: String,
  role: Number,
  password: String,
});

module.exports = mongoose.model('users', TaskSchema);
