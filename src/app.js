const express = require('express');
const logger = require('morgan');
const database = require('./config/database');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database.mongoConnect();

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use(function (err, req, res, next) {
  return res.json('errores');
});

module.exports = app;
