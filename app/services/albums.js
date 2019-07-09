const axios = require('axios'),
  constants = require('../constants'),
  errors = require('../errors'),
  logger = require('../logger'),
  photosService = require('./photos');

const { ALBUM_API_URL } = constants;

exports.getAlbum = async id => {
  const url = `${ALBUM_API_URL}/albums?id=${id}`;
  logger.info(`Making a request to url ${url}`);
  try {
    const albumInfo = await axios.get(`${url}`);
    if (!albumInfo.data.lenght) {
      throw errors.notFound(`Album with id ${id} not found`);
    }
    const photosForAlbum = await photosService.getPhotosForAlbum(id);
    return {
      id: albumInfo.data[0].id,
      title: albumInfo.data[0].title,
      artist: albumInfo.data[0].userId,
      photos: photosForAlbum
    };
  } catch (err) {
    logger.error(`Error while trying to get album with id ${id}: ${err}`);
    throw errors.albumApiError(err.message);
  }
};
