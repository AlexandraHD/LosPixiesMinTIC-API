const { Types } = require('mongoose');
const { Order, Product } = require('../models');

/**
 * @typedef {Object} OrderItem
 * @property {string} product
 * @property {number} quantity
 */

/**
 * @typedef {Object} CreateOrder
 * @property {Date} date
 * @property {OrderItem[]} products
 * @property {string} user
 */

/**
 * @param {CreateOrder} orderData
 * @returns
 */
async function create(orderData) {
  const productIds = orderData.products.map((product) =>
    Types.ObjectId(product.id)
  );
  const productList = await Product.find({ _id: { $in: productIds } });
  const products = productList.map((product) => ({
    name: product.name,
    slug: product.slug,
    price: product.price,
    categories: product.categories,
    images: product.images,
  }));

  orderData.products = orderData.products.map((element, index) => {
    const { id: _, ...product } = products[index];
    return {
      product,
      quantity: element.quantity,
    };
  });

  const order = new Order(orderData);
  await order.save();
  return order;
}

const orderService = {
  create,
};

module.exports = orderService;
