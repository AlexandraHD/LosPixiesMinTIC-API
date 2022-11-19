const productService = require('./product.service');
const orderService = require('./order.service');
const userService = require('./user.service');

module.exports = {
  Product: productService,
  Order: orderService,
  User: userService,
};
