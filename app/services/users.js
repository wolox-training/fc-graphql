const bcrypt = require('bcrypt'),
  constants = require('../constants'),
  errors = require('../errors'),
  logger = require('../logger'),
  User = require('../models').user;

exports.create = async user => {
  logger.info(`Trying to create a new user: ${user}`);
  const { password } = user;
  user.password = await bcrypt.hash(password, constants.SALT_ROUNDS);
  try {
    const createdUser = await User.create(user);
    logger.info(`User with email ${createdUser.email} created succesfully`);
    return {
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName
    };
  } catch (err) {
    logger.error(`Error while trying to create a new user: ${err}`);
    throw errors.databaseError(err.message);
  }
};
