const Controller = require('../../lib/controller');
const reviewSchema  = require('./schema');

class ReviewController extends Controller {}

module.exports = new ReviewController(reviewSchema);
