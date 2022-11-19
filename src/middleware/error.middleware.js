

/**
 * @param {import('@hapi/boom').Boom} error
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
 function errorMiddleware(error, _req, res, _next) {
    return res.status(error.output.statusCode).json(error.output.payload);
  }
  
  module.exports = errorMiddleware;
  