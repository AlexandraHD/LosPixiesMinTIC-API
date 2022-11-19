const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/variables');

/**
 * @param {Object} payload
 */
async function createToken(payload) {
  const token = await jwt.sign(payload, JWT_SECRET, {
    expiresIn: '2h',
  });

  return token;
}

/**
 * @param {string} token
 */
async function verifyToken(token) {
  const isValid = await jwt.verify(token, JWT_SECRET);

  return isValid;
}

module.exports = {
  createToken,
  verifyToken,
};
