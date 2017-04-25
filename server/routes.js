const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const User = require('./model/user/schema');
const UserController = require('./model/user/controller');
const house = require('./model/house/router');
const review = require('./model/review/router');
const jwt = require('jsonwebtoken');

const apiRouter = new Router();
apiRouter.use('/user', user);
apiRouter.use('/house', house);
apiRouter.use('/review', review);
router.use('/api', apiRouter);


const authRouter = new Router();
authRouter.use('/register', (...args) => UserController.create(...args));
authRouter.use('/login', (req, res, next) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    if (user.password !== req.body.password) {
      return res.json({ success: false, message: 'Wrong password' });
    }
    const token = jwt.sign(user, 'loveme', { expiresIn: 60 * 60 * 24 });
    return res.json({
      success: true,
      token
    });
  });
});

router.use('/auth', authRouter);



module.exports = router;
