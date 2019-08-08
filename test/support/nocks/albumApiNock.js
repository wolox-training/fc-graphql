/* eslint-disable new-cap */
const nock = require('nock'),
  config = require('../../../config'),
  photosMock = require('../mocks/photos');

const GET_ALBUMS = '/albums';
const GET_ALBUM = id => `/albums?id=${id}`;
const PHOTOS_FOR_ALBUM = albumId => `/photos?albumId=${albumId}`;

const ALBUM_API_URL = config.common.albumApi.url;

module.exports = {
  getAlbum: {
    okResponse: albumInfo =>
      nock(ALBUM_API_URL)
        .get(GET_ALBUM(albumInfo[0].id))
        .reply(200, albumInfo)
  },
  getAlbums: {
    okResponse: albumsInfo =>
      nock(ALBUM_API_URL)
        .get(GET_ALBUMS)
        .reply(200, albumsInfo)
  },
  photosForAlbum: {
    okResponse: photos =>
      nock(ALBUM_API_URL)
        .get(PHOTOS_FOR_ALBUM(photos[0].albumId))
        .reply(200, photos)
  },
  photosForAlbums: {
    okResponse: albums =>
      albums.map(album =>
        nock(ALBUM_API_URL)
          .get(PHOTOS_FOR_ALBUM(album.id))
          .reply(200, photosMock.photosForAlbum(album.id))
      )
  }
};
