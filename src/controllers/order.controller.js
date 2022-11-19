const errorHandler = require('../utils/errorHandler.util');

const { Order } = require('../services');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
async function create(req, res, next) {
  try {
    const {
      body,
      user: { id },
    } = req;

    const rawOrder = {
      ...body,
      user: id,
    };

    const order = await Order.create(rawOrder);

    return res.json(order);
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
async function findOrders(req, res, next) {
  try {
    const {
      user: { id },
    } = req;

    const orders = await Order.findOrdersByUser(id);
    return res.json(orders);
  } catch (error) {
    return next(error);
  }
}

const orderController = {
  create,
  findOrders,
};

module.exports = orderController;
