const User = require('../model/user/schema');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

exports.register = (req, res, next) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.send(err);
    res.json({ message: 'Successful!' });
  });
};

exports.login = (req, res, next) => {
  User.findOne(req.body).select('_id username').exec((err, user) => {
    if (err) return res.send(err);
    if (!user) {
      return res.json({ success: false, message: 'Wrong username/password' });
    }
    const providedInfo = {
      _id: user._id,
      username: user.username
    };
    const token = jwt.sign(providedInfo, secret, { expiresIn: 60 * 60 * 24 });
    return res.json({
      success: true,
      token
    });
  });
};

exports.getInfo = (req, res, next) => {
  User.findById(req.decoded._id).select('-password').exec( (err, user) => {
    if (err) return res.send(err);
    res.json(user);
  });
};

exports.changeUser = (req, res, next) => {
  const conditions = { _id: req.decoded._id };

  if (req.body.picture_url !== '') req.body.has_profile_pic = true;

  User.update(conditions, req.body).exec( (err, doc) => {
    if (err) return res.send(err);
    if (!doc) { return res.status(404).end(); }
    return res.status(204).end();
  });
};
