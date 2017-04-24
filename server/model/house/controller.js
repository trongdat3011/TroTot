const Controller = require('../../lib/controller');
const houseSchema = require('./schema');

class HouseController extends Controller {}

module.exports = new HouseController(houseSchema);
