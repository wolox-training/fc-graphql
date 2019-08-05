const { orderBy, filter } = require('lodash'),
  axios = require('axios'),
  albumSerializer = require('../serializers/albums'),
  constants = require('../constants'),
  errors = require('../errors'),
  logger = require('../logger');

const { ALBUM_API_URL } = constants;

exports.getAlbum = async id => {
  const url = `${ALBUM_API_URL}/albums?id=${id}`;
  logger.info(`Making a request to url ${url}`);
  try {
    const albumInfo = await axios.get(`${url}`);
    if (!albumInfo.data.length) {
      throw errors.notFound(`Album with id ${id} not found`);
    }
    const albumData = albumInfo.data[0];
    return {
      id: albumData.id,
      title: albumData.title,
      artist: albumData.userId
    };
  } catch (err) {
    logger.error(`Error while trying to get album with id ${id}: ${err}`);
    throw errors.albumApiError(err.message);
  }
};

const getAlbums = async (url, filterBy) => {
  logger.info(`Making a request to url ${url}`);
  try {
    const albums = await axios.get(`${url}`);
    if (filterBy) {
      return filter(albums.data, album => album.title.includes(filterBy));
    }
    return albums.data;
  } catch (err) {
    logger.error('Error while trying to get albums');
    throw errors.albumApiError(err.message);
  }
};

exports.getAlbums = async (offset, limit, order, filterBy) => {
  const url = `${ALBUM_API_URL}/albums`;
  try {
    const albums = await getAlbums(url, filterBy);
    const paginationAlbums = albumSerializer.albumInformation(albums.slice(offset, offset + limit));
    return orderBy(paginationAlbums, [order]);
  } catch (err) {
    logger.error('Error while trying to get albums');
    throw errors.albumApiError(err.message);
  }
};
