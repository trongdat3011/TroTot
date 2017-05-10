const Review = require('../model/review/schema');
const House = require('../model/house/schema');

const distance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
  return 12742 * Math.asin(Math.sqrt(a));
};

/**
 * @api {get} /api/review/:houseid?limit=X Get X latest reviews by houseid
 * @apiName GetReview
 * @apiGroup Review
 *
 * @apiParam {String} houseid Id of the house you want to get reviews of.
 * @apiParam {Number} limit Number of reviews you want.
 *
 * @apiSuccess {String} id ID of the review.
 * @apiSuccess {Number} star_rating Star rating.
 * @apiSuccess {String} comment Comment.
 * @apiSuccess {Object} userPosted User wrote that review.
 * @apiSuccess {String} userPosted._id ID of the user wrote that review.
 * @apiSuccess {String} userPosted.username Obvious.
 * @apiSuccess {String} userPosted.real_name Obvious.
 * @apiSuccess {String} userPosted.picture_url Profile picture url.
 * @apiSuccess {String} createdDate The date comment created.
 *
 * @apiSuccessExample Success-Response:
 *[
 *  {
 *    "_id": "590b3a869d7ded4063a19258",
 *    "star_rating": 5,
 *    "comment": "Tuyet voi",
 *    "houseId": "590b2f31b0fa393451e3b95b",
 *    "userPosted": {
 *      "_id": "590b2f30b0fa393451e3b959",
 *      "username": "trongdat3011",
 *      "real_name": "Dat Tran",
 *      "picture_url": "https://a0.muscache.com/im/pictures/549ee949-2724-46a8-96f7-746443d64fc6.jpg?aki_policy=profile_x_medium",
 *      "has_profile_pic": true
 *    },
 *    "__v": 0,
 *    "createdDate": "2017-05-04T14:28:22.860Z"
 *  }
 *]
 */
exports.getReviews = (req, res, next) => {
  const limit = Number(req.query.limit) || 10;
  Review.find({ houseId: req.params.houseid })
    .sort({ createdDate: -1 })
    .limit(limit)
    .populate('userPosted', 'username real_name has_profile_pic picture_url')
    .exec( (err, reviews) => {
      if (err) return res.send(err);
      res.json(reviews);
    });
};

/**
 * @api {post} /api/review/:houseid Create review for houseid
 * @apiName PostReview
 * @apiGroup Review
 *
 * @apiParam {String} token Send us the token so we know who you are, put it in Header/x-access-token or body/query.
 * @apiParam {String} houseid Id of the house you want to review
 * @apiParam {Number} star_rating Star rating you give (0-5).
 * @apiParam {String} comment Comment about the house.
 *
 * @apiSuccess {String} message Message
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "message": "Successful!"
 *  }
 */
exports.postReview = (req, res, next) => {
  const newReview = Object.assign({}, req.body);
  newReview.houseId = req.params.houseid;
  newReview.userPosted = req.decoded._id;

  const review = new Review(newReview);
  review.save( (err) => {
    if (err) return res.send(err);
    House.findById(req.params.houseid, (err, house) => {
      if (err) return res.send(err);
      house.reviews_count += 1;
      house.star_rating += (req.body.star_rating - house.star_rating) / house.reviews_count;
      house.save( (err) => {
        if (err) return res.send(err);
        res.json({ message: 'Successful!' });
      });
    });
  });
};


/**
 * @api {post} /api/house Create new house.
 * @apiName PostHouse
 * @apiGroup House
 *
 * @apiParam {String} token Send us the token so we know who you are, put it in Header/x-access-token or body/query.
 * @apiParam {String} city City
 * @apiParam {Number} lat Latitude.
 * @apiParam {Number} lng Longtitude.
 * @apiParam {String} name Name of the house.
 * @apiParam {String} person_capacity Person capacity.
 * @apiParam {String} description Describe your house.
 * @apiParam {Number} price Price (must be > 0).
 * @apiParam {String} phone_number Contact of the host.
 * @apiParam {String} picture_url Best picture of your house.
 * @apiParam {String} public_address Public address.
 * @apiParam {String[]} pictures_url All pictures of your house
 * @apiParam {Boolean} available Open for rent or not.
 * @apiParam {String} rent_type Rent type.
 *
 * @apiSuccess {String} message Message
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "message": "Successful!"
 *  }
 */
exports.postHouse = (req, res, next) => {
  const newHouse = Object.assign({}, req.body);
  newHouse.primary_host = req.decoded._id;
  if (typeof newHouse.pictures_url === 'string')
    newHouse.pictures_url = JSON.parse(newHouse.pictures_url);
  const house = new House(newHouse);
  house.save( (err) => {
    if (err) return res.send(err);
    res.json({ message: 'Successful~' });
  });
};

/**
 * @api {put} /api/house/:houseid Change an existed house.
 * @apiName PutHouse
 * @apiGroup House
 *
 * @apiParam {String} token Send us the token so we know who you are, put it in Header/x-access-token or body/query.
 * @apiParam {String} houseid ID of the house you want to change.
 * @apiParam {String} city City
 * @apiParam {Number} lat Latitude.
 * @apiParam {Number} lng Longtitude.
 * @apiParam {String} name Name of the house.
 * @apiParam {String} person_capacity Person capacity.
 * @apiParam {String} description Describe your house.
 * @apiParam {Number} price Price (must be > 0).
 * @apiParam {String} phone_number Contact of the host.
 * @apiParam {String} picture_url Best picture of your house.
 * @apiParam {String} public_address Public address.
 * @apiParam {String[]} pictures_url All pictures of your house
 * @apiParam {Boolean} available Open for rent or not.
 * @apiParam {String} rent_type Rent type.
 *
 * @apiSuccess {String} message Message
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    "message": "Successful!"
 *  }
 */
exports.changeHouse = (req, res, next) => {
  House.findById(req.params.houseid, (err, house) => {
    if (err) return res.send(err);
    if (req.decoded._id != house.primary_host) return res.json( { message: 'No permission' });
    Object.assign(house, req.body);
    house.save( (err) => {
      if (err) return res.send(err);
      res.json({ message: 'Successful~' });
    });
  });

};

/**
 * @api {get} /api/house/:houseid Get specific house info.
 * @apiName GetOneHouse
 * @apiGroup House
 *
 * @apiParam {String} houseid ID of the house you want to change.
 */
exports.getHouseFromId = (req, res, next) => {
  House.findById(req.params.houseid)
    .populate('primary_host', 'username real_name has_profile_pic picture_url')
    .exec( (err, house) => {
      if (err) return res.send(err);
      res.send(house);
    });
};

/**
 * @api {get} /api/house?lat=20.990417&lng=105.838957&radius=10&limit=10&priceLow=1000000&priceHigh=1500000
 * @apiName GetQualifiedHouse
 * @apiGroup House
 *
 * @apiParam {Number} lat Latitude of your position. Required.
 * @apiParam {Number} lng Longtitude of your position. Required.
 * @apiParam {Number} radius Maximum distance from a qualified house to your position.
 * @apiParam {Number} limit Number of houses you want to get. Sort by distance from you.
 * @apiParam {Number} radius Maximum distance from a qualified house to your position.
 * @apiParam {Number} priceLow Minimum price you want to pay.
 * @apiParam {Number} priceHigh Maximum price you want to pay.
 */
exports.getHouses = (req, res, next) => {
  House.find({})
    .populate('primary_host', 'username real_name has_profile_pic picture_url')
    .exec( (err, houses) => {
      if (err) return res.send(err);
      let matchedHouses = [];

      // Assume we always have lat long
      const lat = Number(req.query.lat);
      const lng = Number(req.query.lng);

      matchedHouses = houses.map( house => house.toObject());

      matchedHouses.forEach( (house) => {
        house.distance = distance(lat, lng, house.lat, house.lng);
      });

      if (req.query.radius) {
        const radius = Number(req.query.radius);
        matchedHouses = matchedHouses.filter( house => house.distance < radius);
      }

      if (req.query.priceLow && req.query.priceHigh) {
        const priceLow = Number(req.query.priceLow);
        const priceHigh = Number(req.query.priceHigh);
        matchedHouses = matchedHouses.filter( house => house.price >= priceLow && house.price <= priceHigh);
      }
      if (req.query.limit) {
        const limit = Number(req.query.limit);
        matchedHouses.sort( (a, b) => a.distance - b.distance);
        matchedHouses = matchedHouses.slice(0, Math.min(matchedHouses.length, limit) );
      }

      res.send(matchedHouses);
    });
};
