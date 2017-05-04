const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  real_name: { type: String, required: true },
  has_profile_pic: { type: Boolean, default: false },
  picture_url: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});


module.exports = mongoose.model('User', userSchema);
