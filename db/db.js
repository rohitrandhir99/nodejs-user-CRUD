// We are using local mongodb server
// Here we are using mongoose to establish connection with mongodb
const mongoose = require('mongoose');

// we name the database as 'userCRUD'
const connection = mongoose
  .connect('mongodb://localhost:27017/userCRUD')
  .then(() => {
    console.log('Db connected successfully!');
  })
  .catch((err) => {
    console.log(err);
  });

const db = connection;

module.exports = db;
