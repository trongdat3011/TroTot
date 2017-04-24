const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  houseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'House' },
  star_rating: { type: Number, min: 0, max: 5 },
  comment: { type: String }
});


module.exports = mongoose.model('Review', reviewSchema);
