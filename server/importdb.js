const fs = require('fs');
const House = require('./model/house/schema');
const mongoose   = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongo.url);

let count = 0;
fs.readFile('resources/house.json', 'utf8', (err, data) => {
  const obj = JSON.parse(data);
  for (let i =  0; i < obj.length; i++) {
    const temp = Object.assign({}, obj[i]);
    temp.lat = Number(temp.lat);
    temp.lng = Number(temp.lng);
    temp.price = 2000000;
    // First create a user, and put the ID below
    temp.primary_host = '5900b28f46500c2a0a982da8';
    // Sdt Viet Doan
    temp.phone_number = '01698742102';
    const house = new House(temp);
    house.save( (err) => {
      if (err) return console.log(err);
      count++;
      if (count === obj.length) {
        console.log('Done');
        mongoose.connection.close();
      }
    });
  }

});

