const Controller = require('../../lib/controller');
const hostFacade  = require('./host-facade');

class HostController extends Controller {}

module.exports = new HostController(hostFacade);
