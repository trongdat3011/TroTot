const User = require('../model/user/schema');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

/**
 * @api {post} /register Register new user
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} username Username - must be unique
 * @apiParam {String} password Password of new account
 * @apiParam {String} phone Phone number
 * @apiParam {String} email Email address
 * @apiParam {String} real_name Full name
 *
 * @apiSuccess {String} message Basically a message.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "message": "Successful!"
 *     }
 */
exports.register = (req, res, next) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.send(err);
    res.json({ message: 'Successful!' });
  });
};

/**
 * @api {post} /login Login to an existed account
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} username Isn't the name obvious?
 * @apiParam {String} password Same as above.
 *
 * @apiSuccess {Boolean} success Status of request.
 * @apiSuccess {String} token Your access token, keep it to access user's api.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "success": true,
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBiNGEwODM0MGQ4ZDRlNjAwMTg0ZWUiLCJ1c2VybmFtZSI6InRlc3R1c2VyMTIzIiwiaWF0IjoxNDkzOTEyMzIyLCJleHAiOjE0OTM5OTg3MjJ9.FD9ad_K7Fg19pH0SfsAMdDMaB-u-HXy979kgcYrt8HA"
 *     }
 */
exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username, password: req.body.password })
  .select('_id username').exec((err, user) => {
    if (err) return res.send(err);
    if (!user) {
      return res.json({ success: false, message: 'Wrong username/password' });
    }
    console.log(user);
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

/**
 * @api {get} /account Get account info
 * @apiName GetInfo
 * @apiGroup User
 *
 * @apiParam {String} token Send us the token so we know who you are, put it in Header/x-access-token or body/query.
 *
 * @apiSuccess {String} _id Your ID.
 * @apiSuccess {String} username Your username.
 * @apiSuccess {String} phone Your phone number.
 * @apiSuccess {String} email Your email.
 * @apiSuccess {String} real_name Your full name.
 * @apiSuccess {Boolean} has_profile_pic Whether you have a profile pictire or not.
 * @apiSuccess {String} picture_url Your profile picture url.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "_id": "590b4a08340d8d4e600184ee",
 *       "username": "testuser123",
 *       "phone": "0903401996",
 *       "email": "testuser123@gmail.com",
 *       "real_name": "Dinh La Thang",
 *       "__v": 0,
 *       "picture_url": "https://a0.muscache.com/defaults/user_pic-225x225.png?v=3",
 *       "has_profile_pic": true
 *     }
 */
exports.getInfo = (req, res, next) => {
  User.findById(req.decoded._id).select('-password').exec( (err, user) => {
    if (err) return res.send(err);
    res.json(user);
  });
};

/**
 * @api {put} /account Change account info
 * @apiName ChangeInfo
 * @apiGroup User
 *
 * @apiParam {String} token Send us the token so we know who you are, put it in Header/x-access-token or body/query.
 * @apiParam {String} phone Your phone number.
 * @apiParam {String} email Your email.
 * @apiParam {String} real_name Your full name.
 * @apiParam {String} picture_url Your profile picture url.
 *
 * @apiSuccess {String} message Well, a message.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "message": "Successful!
 *     }
 */
exports.changeUser = (req, res, next) => {
  const conditions = { _id: req.decoded._id };

  if (req.body.picture_url !== '') req.body.has_profile_pic = true;

  User.update(conditions, req.body).exec( (err, doc) => {
    if (err) return res.send(err);
    if (!doc) { return res.status(404).end(); }
    res.json({ message: 'Successful!' });
  });
};
