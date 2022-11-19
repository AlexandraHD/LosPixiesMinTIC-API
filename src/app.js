const express = require('express');
const logger = require('morgan');

const productsRouter = require('./routes/product.router');
const ordersRouter = require('./routes/order.router');
const usersRouter = require('./routes/users.router');
const { Error, NotFound } = require('./middleware');
const database = require('./config/database');
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database.mongoConnect();

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);

// error handler
app.use(NotFound);
app.use(Error);

module.exports = app;
