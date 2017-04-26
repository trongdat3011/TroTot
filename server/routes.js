const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const secret = require('./config').secret;
const tokenChecker = require('./lib/tokenChecker');

const User = require('./model/user/schema');
const UserController = require('./model/user/controller');

const Review = require('./model/review/schema');

const user = require('./model/user/router');
const house = require('./model/house/router');
const review = require('./model/review/router');


// Api router - basic CRUD fortesting
const apiRouter = new Router();
apiRouter.use('/house', house);
apiRouter.use('/review', review);
apiRouter.use('/user', user);


const mainRouter = new Router();
mainRouter
  // .use('/api', apiRouter)
  .post('/register', (...args) => UserController.create(...args))
  .post('/login', (req, res, next) => {
    User.findOne(req.body).select('_id username').exec( (err, user) => {
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
  })
  .get('/account', tokenChecker, (req, res, next) => {
    User.findById(req.decoded._id).select('-password').exec( (err, user) => {
      if (err) return res.send(err);
      res.json(user);
    });
  })
  .put('/account', tokenChecker, (req, res, next) => {
    const conditions = { _id: req.decoded._id };

    if (req.body.picture_url !== '') req.body.has_profile_pic = true;

    User.update(conditions, req.body).exec( (err, doc) => {
      if (err) return res.send(err);
      if (!doc) { return res.status(404).end(); }
      return res.status(204).end();
    });
  })
  .get('/api/review/:houseid', (req, res, next) => {
    const limit = Number(req.query.limit) || 10;
    Review.find({ houseId: req.params.houseid })
      .sort({ createdDate: -1 })
      .limit(limit)
      .populate('userPosted', 'username real_name has_profile_pic picture_url')
      .exec( (err, reviews) => {
        if (err) return res.send(err);
        res.json(reviews);
      });
  })
  .post('/api/review/:houseid', tokenChecker, (req, res, next) => {
    const newReview = Object.assign({}, req.body);
    newReview.houseId = req.params.houseid;
    newReview.userPosted = req.decoded._id;

    const review = new Review(newReview);
    review.save( (err) => {
      if (err) return res.send(err);
      res.json({ message: 'Successful!' });
    });
  });


module.exports = mainRouter;
