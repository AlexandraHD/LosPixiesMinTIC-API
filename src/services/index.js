const productService = require('./product.service');
const userService = require('./user.service');

module.exports = {
  Product: productService,
  User: userService,
};
