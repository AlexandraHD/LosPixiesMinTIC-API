const productModel = require('./product.model');
const orderModel = require('./order.model');
const userModel = require('./user.model');

module.exports = {
  Product: productModel,
  Order: orderModel,
  User: userModel,
};
