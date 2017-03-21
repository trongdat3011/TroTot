const Router = require('express').Router;
const router = new Router();

const user  = require('./model/user/user-router');
const host  = require('./model/host/host-router');
const place  = require('./model/place/place-router');
/* yeoman require hook */
/* Don't remove this comment, it is needed by the sub generator */

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to tro-tot API!' });
});

router.use('/user', user);
router.use('/host', host);
router.use('/place', place);
/* yeoman use hook */
/* Don't remove this comment, it is needed by the sub generator' */

module.exports = router;
