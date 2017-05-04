const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  userPosted: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  houseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'House' },
  star_rating: { type: Number, min: 0, max: 5, required: true },
  createdDate: { type: Date, default: Date.now },
  comment: { type: String, required: true }
});


module.exports = mongoose.model('Review', reviewSchema);
