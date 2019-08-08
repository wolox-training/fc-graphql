const faker = require('faker');

exports.albums = () =>
  Array.from({ length: 5 }, () => ({
    userId: faker.random.number(),
    id: faker.random.number(),
    title: faker.name.title()
  }));

exports.albumInfo = albumId => [
  {
    userId: faker.random.number(),
    id: albumId,
    title: faker.name.title()
  }
];
