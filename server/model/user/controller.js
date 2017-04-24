const Controller = require('../../lib/controller');
const userSchema  = require('./schema');

class UserController extends Controller {}

module.exports = new UserController(userSchema);
