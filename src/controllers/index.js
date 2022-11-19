const productController = require('./product.controller');
const userController = require('./user.controller');

module.exports = {
  Product: productController,
  User: userController,
};
