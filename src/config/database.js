const mongoose = require('mongoose');
const consola = require('consola');

const config = require('./variables');

exports.mongoConnect = () => {
  const mongoStringConnection = config.DATABASE_URI;

  mongoose.connect(mongoStringConnection);
  mongoose.Promise = global.Promise;
  const dbConnection = mongoose.connection;

  dbConnection.on('connected', () => consola.success('Mongodb connected'));

  dbConnection.on('error', () => consola.error('Mongodb connection error'));
};
