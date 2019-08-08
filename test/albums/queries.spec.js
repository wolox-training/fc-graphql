/* eslint-disable */
const { query } = require('../server.spec'),
  { getAlbum, getAlbums } = require('./graphql'),
  faker = require('faker'),
  albumsNock = require('../support/nocks/albumApiNock'),
  albumsMock = require('../support/mocks/albums'),
  photosMock = require('../support/mocks/photos');

const checkProperties = albums =>
  albums.map(album => expect(album).toHaveProperty('title', 'id', 'artist', 'photos'));

describe('albums', () => {
  describe('queries', () => {
    describe('Get album by id', () => {
      const albumId = faker.random.number();
      const albumInfo = albumsMock.albumInfo(albumId);
      const photosForAlbum = photosMock.photosForAlbum(albumId);
      let response;

      beforeEach(async () => {
        await albumsNock.getAlbum.okResponse(albumInfo);
        await albumsNock.photosForAlbum.okResponse(photosForAlbum);
        response = await query(getAlbum(albumId));
      });

      it('returns album information succesfully', () => {
        expect(parseInt(response.data.getAlbum.id)).toEqual(albumInfo[0].id);
        expect(response.data.getAlbum.title).toEqual(albumInfo[0].title);
        expect(response.data.getAlbum.artist).toEqual(albumInfo[0].userId);
      });
    });

    describe('Get albums', () => {
      const albumsInfo = albumsMock.albums();
      let response;

      describe('When get albums order by Id DESC', () => {
        beforeEach(async () => {
          await albumsNock.getAlbums.okResponse(albumsInfo);
          await albumsNock.photosForAlbums.okResponse(albumsInfo);
          response = await query(getAlbums(0, 3, 'id'));
        });

        it('returns albums', () => {
          expect(response.data.getAlbums.length).toBe(3);
          checkProperties(response.data.getAlbums);
          response.data.getAlbums.every((album, index, arr) => !index || album.id >= arr[index - 1].id);

        });
      });

      describe('When get albums order by title DESC', () => {
        beforeEach(async () => {
          await albumsNock.getAlbums.okResponse(albumsInfo);
          await albumsNock.photosForAlbums.okResponse(albumsInfo);
          response = await query(getAlbums(0, 3, 'title'));
        });

        it('returns albums', () => {
          expect(response.data.getAlbums.length).toBe(3);
          checkProperties(response.data.getAlbums);
          response.data.getAlbums.every((album, index, arr) => !index || album.title >= arr[index - 1].title);
        });
      });

      describe('When get albums filtered by title', () => {
        const title = albumsInfo[0].title;
        beforeEach(async () => {
          await albumsNock.getAlbums.okResponse(albumsInfo);
          await albumsNock.photosForAlbums.okResponse(albumsInfo);
          response = await query(getAlbums(0, 3, 'title', title));
        });

        it('returns albums', () => {
          expect(response.data.getAlbums.length).toBe(1);
          checkProperties(response.data.getAlbums);
          expect(response.data.getAlbums[0].title).toEqual(title);
        });
      });
    });
  });
});
