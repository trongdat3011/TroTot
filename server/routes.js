const Router = require('express').Router;
const router = new Router();

const user   = require('./model/user/router');
const house  = require('./model/house/router.js');
const review = require('./model/review/router.js');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to tro-tot API!' });
});

router.use('/user', user);
router.use('/house', house);
router.use('/review', review);

module.exports = router;
