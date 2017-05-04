const fs = require('fs');
const House = require('../model/house/schema');
const User = require('../model/user/schema');
const mongoose   = require('mongoose');
const config = require('../config');

mongoose.connect(config.mongo.url);

const actors = [
  {
    username: 'chuviethieu',
    password: 'mothaiba',
    real_name: 'Hieu Chu',
    email: 'chuviethieu@gmail.com',
    phone: '0901234567'
  },
  {
    username: 'doanvanviet',
    password: 'mothaiba',
    real_name: 'Viet Doan',
    email: 'doanvanviet@gmail.com',
    phone: '0907654321'
  },
  {
    username: 'buiducthinh',
    password: 'mothaiba',
    real_name: 'Thinh Tu',
    email: 'buiducthinh@gmail.com',
    phone: '0902742943'
  },
  {
    username: 'dangthaitue',
    password: 'mothaiba',
    real_name: 'Tue Dang',
    email: 'dangthaitue@gmail.com',
    phone: '0902278648'
  }
];

for (let i = 0; i < actors.length; i++) {
  const actor = new User(actors[i]);
  actor.save( (err) => {
    if (err) return console.log(err.message);
  });
}

const data = JSON.parse(fs.readFileSync('resources/house.json', 'utf8'));

const admin = new User({
  username: 'trongdat3011',
  password: 'mothaiba',
  real_name: 'Dat Tran',
  email: 'trantrongdat1@gmail.com',
  phone: '0903401996'
});

let count = 0;
admin.save( (err, doc) => {
  if (err) return console.log(err.message);
  console.log('Done: create admin');
  for (let i =  0; i < data.length; i++) {
    const temp = Object.assign({}, data[i]);
    temp.lat = Number(temp.lat);
    temp.lng = Number(temp.lng);
    temp.primary_host = doc._id;
    const house = new House(temp);
    house.save( (err) => {
      if (err) return console.log(err);
      count++;
      if (count === data.length) {
        console.log('Done');
        mongoose.connection.close();
      }
    });
  }
});
