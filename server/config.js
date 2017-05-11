const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    testUrl: process.env.MONGO_DB_URI || 'mongodb://localhost/tro-tot',
    productionUrl: process.env.MONGO_DB_URI || 'mongodb://trongdat3011:wipe1996@ds137281.mlab.com:37281/trotot-api-server',
    test: false
  },
  secret: 'vietdoangotit',
  admin: 'trongdat3011'
};
config.mongo.url = config.mongo.test ? config.mongo.testUrl : config.mongo.productionUrl;
console.log(config.mongo.url);
module.exports = config;
