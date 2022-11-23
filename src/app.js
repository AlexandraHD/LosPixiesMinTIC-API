const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const productsRouter = require('./routes/product.router');
const ordersRouter = require('./routes/order.router');
const usersRouter = require('./routes/users.router');
const { Error, NotFound } = require('./middleware');
const { CLIENT } = require('./config/variables');
const database = require('./config/database');
const indexRouter = require('./routes/index');

/**
 * @type {swaggerJSDoc.Options}
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.router.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

const corsOptions = {
  origin: CLIENT,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

database.mongoConnect();

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);
app.use('/docs', (_req, res, _next) => res.send(swaggerSpec));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(NotFound);
app.use(Error);

module.exports = app;
