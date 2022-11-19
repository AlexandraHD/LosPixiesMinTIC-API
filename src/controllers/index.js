const productController = require('./product.controller');
const orderController = require('./order.controller');
const userController = require('./user.controller');

module.exports = {
  Product: productController,
  Order: orderController,
  User: userController,
};

