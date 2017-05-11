require('dotenv').config();
const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    testUrl: 'mongodb://localhost/tro-tot',
    productionUrl: `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@${process.env.DB_PATH}`,
    test: false
  },
  secret: process.env.TOKEN_SECRET,
  admin: process.env.API_ADMIN
};
config.mongo.url = process.env.MONGO_DB_URI || (config.mongo.test ? config.mongo.testUrl : config.mongo.productionUrl);
console.log(config.mongo.url);
module.exports = config;
