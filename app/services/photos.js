const axios = require('axios'),
  constants = require('../constants'),
  errors = require('../errors'),
  logger = require('../logger');

const { ALBUM_API_URL } = constants;

const getPhotosForOneAlbum = async albumId => {
  const url = `${ALBUM_API_URL}/photos?albumId=${albumId}`;
  logger.info(`Making a request to url ${url}`);
  try {
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (err) {
    logger.error(`Error while trying to get photos for album with id ${albumId}: ${err}`);
    throw errors.albumApiError(err.message);
  }
};

exports.getPhotosForAlbum = albumId => {
  try {
    return getPhotosForOneAlbum(albumId);
  } catch (err) {
    logger.error(`Error while trying to get photos for album with id ${albumId}: ${err}`);
    throw errors.albumApiError(err.message);
  }
};
