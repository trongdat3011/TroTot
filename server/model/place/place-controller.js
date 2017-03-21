const Controller = require('../../lib/controller');
const placeFacade  = require('./place-facade');

class PlaceController extends Controller {}

module.exports = new PlaceController(placeFacade);
