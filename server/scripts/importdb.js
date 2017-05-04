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
    phone: '0901234567',
    has_profile_pic: true,
    picture_url: 'https://a0.muscache.com/im/pictures/61309e42-6212-499e-b86a-2147da97eb87.jpg?aki_policy=profile_x_medium'
  },
  {
    username: 'doanvanviet',
    password: 'mothaiba',
    real_name: 'Viet Doan',
    email: 'doanvanviet@gmail.com',
    phone: '0907654321',
    has_profile_pic: true,
    picture_url: 'https://a0.muscache.com/im/users/2153402/profile_pic/1368607645/original.jpg?aki_policy=profile_x_medium'
  },
  {
    username: 'buiducthinh',
    password: 'mothaiba',
    real_name: 'Thinh Tu',
    email: 'buiducthinh@gmail.com',
    phone: '0902742943',
    has_profile_pic: true,
    picture_url: 'https://a0.muscache.com/im/users/7629389/profile_pic/1374443098/original.jpg?aki_policy=profile_x_medium'
  },
  {
    username: 'dangthaitue',
    password: 'mothaiba',
    real_name: 'Tue Dang',
    email: 'dangthaitue@gmail.com',
    phone: '0902278648',
    has_profile_pic: true,
    picture_url: 'https://a0.muscache.com/im/users/12969129/profile_pic/1394435215/original.jpg?aki_policy=profile_x_medium'
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
  phone: '0903401996',
  has_profile_pic: true,
  picture_url: 'https://a0.muscache.com/im/pictures/549ee949-2724-46a8-96f7-746443d64fc6.jpg?aki_policy=profile_x_medium'
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
    temp.rent_type = 'Cho thuê';
    const house = new House(temp);
    house.save( (err) => {
      if (err) return console.log(err);
      count++;
      if (count === data.length) {
        console.log('Done: create houses');
        mongoose.connection.close();
      }
    });
  }
});
