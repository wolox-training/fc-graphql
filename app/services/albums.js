const _ = require('lodash'),
  axios = require('axios'),
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
    if (!albumInfo.data.length) {
      throw errors.notFound(`Album with id ${id} not found`);
    }
    const photosForAlbum = await photosService.getPhotosForAlbum(id);
    const albumData = albumInfo.data[0];
    return {
      id: albumData.id,
      title: albumData.title,
      artist: albumData.userId,
      photos: photosForAlbum
    };
  } catch (err) {
    logger.error(`Error while trying to get album with id ${id}: ${err}`);
    throw errors.albumApiError(err.message);
  }
};

exports.getAlbums = async (offset, limit, orderBy) => {
  const url = `${ALBUM_API_URL}/albums`;
  logger.info(`Making a request to url ${url}`);
  try {
    const albums = await axios.get(`${url}`);
    const paginationAlbums = albums.data.slice(offset, offset + limit);
    const photosForAlbums = await photosService.getPhotosForAlbums(paginationAlbums);

    return _.orderBy(photosForAlbums, [orderBy]);
  } catch (err) {
    logger.error('Error while trying to get albums');
    throw errors.albumApiError(err.message);
  }
};
