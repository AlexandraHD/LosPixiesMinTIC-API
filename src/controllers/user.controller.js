const Boom = require('@hapi/boom');

const { User } = require('../services');
const errorHandler = require('../utils/errorHandler.util');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
async function login(req, res, next) {
  try {
    const { body } = req;
    const user = await User.login(body);
    return res.json(user);
  } catch (error) {
    const err = Boom.unauthorized('Invalid credentials');
    return next(err);
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
async function signup(req, res, next) {
  try {
    const { body } = req;
    const user = await User.signup(body);
    return res.status(201).json(user);
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
      params: { userId },
    } = req;
    const user = await User.update(userId, body);
    return res.json(user);
  } catch (error) {
    const err = Boom.badImplementation('Something went wrong', error);
    return next(err);
  }
}

const userController = {
  login,
  signup,
  update,
};

module.exports = userController;