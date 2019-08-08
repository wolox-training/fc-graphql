const faker = require('faker');

exports.photosForAlbum = albumId =>
  Array.from({ length: 5 }, () => ({
    albumId,
    id: faker.random.number(),
    title: faker.name.title(),
    url: faker.internet.url(),
    thumbnailUrl: faker.image.dataUri()
  }));
