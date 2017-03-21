const Model = require('../../lib/facade');
const hostSchema  = require('./host-schema');

class HostModel extends Model {}

module.exports = new HostModel(hostSchema);
