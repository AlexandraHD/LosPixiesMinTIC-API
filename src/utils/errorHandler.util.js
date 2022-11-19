const { Error } = require('mongoose');
const Boom = require('@hapi/boom');

const { ConflictError, OrderError } = require('./errors');

/**
 * @param {*} error
 * @returns
 */
function errorHandler(error) {
  if (error instanceof Error.ValidationError || error instanceof OrderError) {
    return Boom.badRequest(error.message, error);
  }

  if (error instanceof Error.CastError) {
    return Boom.notFound();
  }

  if (error?.code === 11000 || error instanceof ConflictError) {
    return Boom.conflict('User already exists', error);
  }

  return Boom.badImplementation('Something went wrong', error);
}

module.exports = errorHandler;
