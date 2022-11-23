const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

const { JWT_SECRET } = require('../config/variables');
const { User } = require('../models');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
async function isAuth(req, _res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return next(Boom.unauthorized('Invalid credentials'));

    const userDecoded = await jwt.decode(token, JWT_SECRET);

    const user = await User.findOne({ email: userDecoded.email });

    if (!user) return next(Boom.unauthorized('Invalid credentials'));

    req.user = user;

    return next();
  } catch (error) {
    return next(Boom.unauthorized('Invalid credentials'));
  }
}

const authMiddleware = {
  isAuth,
};

module.exports = authMiddleware;
