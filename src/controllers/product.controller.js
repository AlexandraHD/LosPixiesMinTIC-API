const errorHandler = require('../utils/errorHandler.util');
const { Product } = require('../services');

/**
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
async function findAll(_req, res, next) {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (error) {
    const err = errorHandler(error);
    return next(err);
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
async function findById(req, res, next) {
  try {
    const {
      params: { productId },
    } = req;
    const product = await Product.findById(productId);
    if (!product) return next();

    return res.json(product);
  } catch (error) {
    const err = errorHandler(error);
    return next(err);
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
async function create(req, res, next) {
  try {
    const { body } = req;
    const product = await Product.create(body);
    return res.status(201).json(product);
  } catch (error) {
    const err = errorHandler(error);
    return next(err);
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
async function update(req, res, next) {
  try {
    const {
      body,
      params: { productId },
    } = req;

    const udpatedProduct = await Product.update(productId, body);
    return res.json(udpatedProduct);
  } catch (error) {
    const err = errorHandler(error);
    return next(err);
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
async function deleteProduct(req, res, next) {
  try {
    const {
      params: { productId },
    } = req;
    const deletedProduct = await Product.deleteProduct(productId);
    if (!deletedProduct) return next();
    return res.status(204).send();
  } catch (error) {
    const err = errorHandler(error);
    return next(err);
  }
}

const productController = {
  findAll,
  findById,
  create,
  update,
  deleteProduct,
};

module.exports = productController;
