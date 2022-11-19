const Boom = require('@hapi/boom');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
function notFoundMiddleware(req, _res, next) {
  const error = Boom.notFound(`${req.url} was not found!`);
  return next(error);
}

module.exports = notFoundMiddleware;
