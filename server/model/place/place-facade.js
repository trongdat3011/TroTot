const Model = require('../../lib/facade');
const placeSchema  = require('./place-schema');

class PlaceModel extends Model {}

module.exports = new PlaceModel(placeSchema);
