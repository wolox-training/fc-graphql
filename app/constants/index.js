const config = require('./../../config');

exports.ALBUM_API_URL = config.common.albumApi.url;
exports.SALT_ROUNDS = parseInt(config.common.bcrypt.saltRounds);
