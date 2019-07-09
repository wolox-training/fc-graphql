const { gql } = require('apollo-server'),
  albumsService = require('../../services/albums');

module.exports = {
  queries: {
    getAlbum: (_, { id }) => albumsService.getAlbum(id)
  },
  schema: gql`
    extend type Query {
      getAlbum(id: ID!): Album!
    }
  `
};
