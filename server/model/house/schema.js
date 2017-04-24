const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const houseSchema = new Schema({
  city: { type: String },
  lat: { type: Number, min: 0, max: 180 },
  lng: { type: Number, min: 0, max: 180 },
  name: { type: String },
  person_capacity: { type: Number, min: 1 },
  description: { type: String },
  price: {  type: Number, min: 0 },
  phone_number: { type: String },
  picture_url: { type: String },
  primary_host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  public_address: { type: String },
  reviews_count: { type: Number },
  star_rating: { type: Number, min: 0, max: 5 },
  pictures_url: [String]
});


module.exports = mongoose.model('House', houseSchema);
