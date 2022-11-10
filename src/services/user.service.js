const { User } = require('../models');

/**
 * @typedef {Object} CreateId
 * @property {('CC'|'CE'|'PPE')} type
 * @property {string} id
 */

/**
 * @typedef {Object} SignupData
 * @property {CreateId} identification
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} password
 * @property {string=} phone
 * @property {Date} birthday
 * @property {string[]} address
 */

/**
 * @typedef {Object} LoginData
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} CreateId
 * @property {('CC'|'CE'|'PPE')} type
 * @property {string} id
 */

/**
 * @typedef {Object} UpdateData
 * @property {string=} first_name
 * @property {string=} last_name
 * @property {string=} email
 * @property {string=} password
 * @property {string=} phone
 * @property {Date=} birthday
 * @property {string[]=} address
 */

/**
 * @param {SignupData} userData
 */
async function signup(userData) {
  const alreadyExists = await User.findOne({ email: userData.email });

  if (alreadyExists) throw new Error('User already exists');

  const user = new User(userData);
  await user.save();
  return user;
}

/**
 * @param {LoginData} userData
 */
async function login(userData) {
  const user = await User.findOne({ email: userData.email });

  if (!user) throw new Error('Invalid credentials');

  const isMatch = await user.validatePassword(userData.password);
  if (isMatch) return user;

  throw new Error('Invalid credentials');
}

/**
 *
 * @param {string} userId
 * @param {UpdateData} updatedData
 * @returns
 */
async function update(userId, updatedData) {
  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });

  return updatedUser;
}

const userService = {
  signup,
  login,
  update,
};

module.exports = userService;
