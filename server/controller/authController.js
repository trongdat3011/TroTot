const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const admin = require('../config').admin;


exports.tokenChecker = (req, res, next) => {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
exports.adminChecker = (req, res, next) => {
  if (req.decoded.username === admin) next();
  return res.json({ message: 'No permission' });
};
