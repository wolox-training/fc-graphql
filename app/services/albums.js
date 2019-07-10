const _ = require('lodash'),
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

exports.getAlbums = async (offset, limit, orderBy) => {
  const url = `${ALBUM_API_URL}/albums`;
  logger.info(`Making a request to url ${url}`);
  try {
    const albums = await axios.get(`${url}`);
    const paginationAlbums = albumSerializer.albumInformation(albums.data.slice(offset, offset + limit));
    return _.orderBy(paginationAlbums, [orderBy]);
  } catch (err) {
    logger.error('Error while trying to get albums');
    throw errors.albumApiError(err.message);
  }
};

exports.getAlbumsByTitle = async title => {
  const url = `${ALBUM_API_URL}/albums`;
  logger.info(`Making a request to url ${url}`);
  try {
    const albums = await axios.get(`${url}`);
    const albumsInfo = albumSerializer.albumInformation(albums.data);
    return _.filter(albumsInfo, album => album.title.includes(title));
  } catch (err) {
    logger.error('Error while trying to get albums');
    throw errors.albumApiError(err.message);
  }
};
