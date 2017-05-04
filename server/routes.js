const Router = require('express').Router;

const tokenChecker = require('./controller/authController').tokenChecker;
const adminChecker = require('./controller/authController').adminChecker;
const accController = require('./controller/accountController');
const apiController = require('./controller/apiController');

const user = require('./model/user/router');
const house = require('./model/house/router');
const review = require('./model/review/router');

const adminRouter = new Router();
adminRouter
  .use(tokenChecker, adminChecker)
  .use('/house', house)
  .use('/review', review)
  .use('/user', user);

const apiRouter = new Router();
apiRouter
  .get('/review/:houseid', apiController.getReviews)
  .post('/review/:houseid', tokenChecker, apiController.postReview)
  .post('/house', tokenChecker, apiController.postHouse)
  .get('/house/:houseid', apiController.getHouseFromId)
  .get('/house', apiController.getHouses);

const accountRouter = new Router();
accountRouter
  .post('/register', accController.register)
  .post('/login', accController.login)
  .get('/account', tokenChecker, accController.getInfo)
  .put('/account', tokenChecker, accController.changeUser);

const mainRouter = new Router();
mainRouter
  .use('/admin', adminRouter)
  .use('/api/', apiRouter)
  .use('/', accountRouter);


module.exports = mainRouter;
