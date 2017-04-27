const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const houseSchema = new Schema({
  city: { type: String, require: true },
  lat: { type: Number, min: -180, max: 180, require: true },
  lng: { type: Number, min: -180, max: 180, require: true },
  name: { type: String, require: true },
  person_capacity: { type: Number, min: 1, require: true },
  description: { type: String, require: true },
  price: {  type: Number, min: 0, require: true },
  phone_number: { type: String, require: true },
  picture_url: { type: String },
  primary_host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  public_address: { type: String, require: true },
  reviews_count: { type: Number, default: 0 },
  star_rating: { type: Number, min: 0, max: 5, default: 0 },
  pictures_url: [String]
});


module.exports = mongoose.model('House', houseSchema);
