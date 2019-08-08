const config = require('./../../config'),
  errors = require('../errors');

exports.ALBUM_API_URL = config.common.albumApi.url;
exports.SALT_ROUNDS = parseInt(config.common.bcrypt.saltRounds);
exports.STATUS_CODES = {
  [errors.NOT_FOUND]: 404,
  [errors.DATABASE_ERROR]: 503,
  [errors.CREDENTIALS_ERROR]: 401,
  [errors.TOKEN_EXPIRATION_ERROR]: 400,
  [errors.BAD_REQUEST_ERROR]: 400,
  [errors.FORBIDDEN_ERROR]: 403,
  [errors.VALIDATION_ERROR]: 400,
  [errors.INVALID_PARAMS]: 422,
  [errors.COIN_API_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500
};
