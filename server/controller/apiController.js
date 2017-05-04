const Review = require('../model/review/schema');
const House = require('../model/house/schema');

const distance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
  return 12742 * Math.asin(Math.sqrt(a));
};

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

exports.postHouse = (req, res, next) => {
  const newHouse = Object.assign({}, req.body);
  newHouse.primary_host = req.decoded._id;
  const house = new House(newHouse);
  house.save( (err) => {
    if (err) return res.send(err);
    res.json({ message: 'Successful~' });
  });
};

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

exports.getHouseFromId = (req, res, next) => {
  House.findById(req.params.houseid)
    .populate('primary_host', 'username real_name has_profile_pic picture_url')
    .exec( (err, house) => {
      if (err) return res.send(err);
      res.send(house);
    });
};

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
