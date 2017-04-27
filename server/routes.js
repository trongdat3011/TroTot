const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const secret = require('./config').secret;
const tokenChecker = require('./lib/tokenChecker');

const User = require('./model/user/schema');
const Review = require('./model/review/schema');
const House = require('./model/house/schema');

const user = require('./model/user/router');
const house = require('./model/house/router');
const review = require('./model/review/router');

function distance(lat1, lon1, lat2, lon2) {
  // console.log(lat1 + " " + lon1 + " " + lat2 + " " + lon2);
  const p = 0.017453292519943295;    // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

// Api router - basic CRUD fortesting
const apiRouter = new Router();
apiRouter.use('/house', house);
apiRouter.use('/review', review);
apiRouter.use('/user', user);

const mainRouter = new Router();
mainRouter
  // .use('/api', apiRouter)
  .post('/register', (req, res, next) => {
    const user = new User(req.body);
    user.save( (err) => {
      if (err) return res.send(err);
      res.json({ message: 'Successful!' });
    });
  })
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
  })
  .post('/api/house', tokenChecker, (req, res, next) => {
    const newHouse = Object.assign({}, req.body);
    newHouse.primary_host = req.decoded._id;
    const house = new House(newHouse);
    house.save( (err) => {
      if (err) return res.send(err);
      res.json({ message: 'Successful~' });
    });
  })
  .get('/api/house/:houseid', (req, res, next) => {
    House.findById(req.params.houseid)
      .populate('primary_host', 'username real_name has_profile_pic picture_url')
      .exec( (err, house) => {
        if (err) return res.send(err);
        res.send(house);
      });
  })
  .get('/api/house', (req, res, next) => {
    House.find({})
      .populate('primary_host', 'username real_name has_profile_pic picture_url')
      .exec( (err, houses) => {
        if (err) return res.send(err);
        let matchedHouses = [];
        if (req.params.radius) {
          houses.forEach( (house) => {
            if ( distance(Number(req.query.lat), Number(req.query.lng), house.lat, house.lng) < Number(req.query.radius) )
              {matchedHouses.push(house);}
          });
        } else {
          matchedHouses = houses.map( (house) => {
            const temp = house.toObject();
            temp.distance = distance(Number(req.query.lat), Number(req.query.lng), house.lat, house.lng);
            return temp;
          });
          matchedHouses.sort( (a, b) => {
            return a.distance - b.distance;
          });
          matchedHouses = matchedHouses.slice(0, Math.min(matchedHouses.length, Number(req.query.limit) + 1));
        }
        res.send(matchedHouses);
      });
  });


module.exports = mainRouter;
