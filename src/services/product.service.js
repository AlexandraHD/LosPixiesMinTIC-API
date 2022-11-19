const { Product } = require('../models');

/**
 * @typedef {Object} CreateProduct
 * @property {string} name
 * @property {number} price
 * @property {number} quantityInStock
 * @property {string=} description
 * @property {string[]=} categories
 */

/**
 * @typedef {Object} UpdateProduct
 * @property {string=} name
 * @property {number=} price
 * @property {number=} quantityInStock
 * @property {string=} description
 * @property {string[]=} categories
 */

/**
 * @param {CreateProduct} productData
 */
async function create(productData) {
  const product = new Product(productData);
  await product.save();
  return product;
}

async function findAll() {
  const products = await Product.find({});
  return products;
}

/**
 * @param {string} productId
 * @returns
 */
async function findById(productId) {
  const product = await Product.findById(productId);
  return product;
}

/**
 * @param {string} productSlug
 * @returns
 */
async function findBySlug(productSlug) {
  const product = await Product.findOne({ slug: productSlug });
  return product;
}

/**
 * @param {string} productId
 * @param {UpdateProduct} updatedData
 * @returns
 */
async function update(productId, updatedData) {
  const updatedUser = await Product.findByIdAndUpdate(productId, updatedData, {
    new: true,
  });

  return updatedUser;
}

/**
 * @param {string} productId
 * @returns
 */
async function deleteProduct(productId) {
  const deletedProduct = await Product.findByIdAndRemove(productId);
  return deletedProduct;
}

const productService = {
  create,
  findAll,
  findById,
  findBySlug,
  update,
  deleteProduct,
};

module.exports = productService;
