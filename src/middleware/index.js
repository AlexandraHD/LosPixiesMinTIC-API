const notFoundMiddleware = require('./notFound.middleware');
const errorMiddleware = require('./error.middleware');
const authMiddleware = require('./auth.middleware');

module.exports = {
  NotFound: notFoundMiddleware,
  Error: errorMiddleware,
  Auth: authMiddleware,
};
