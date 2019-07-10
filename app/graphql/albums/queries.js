const { gql } = require('apollo-server'),
  albumsService = require('../../services/albums');

module.exports = {
  queries: {
    getAlbum: (_, { id }) => albumsService.getAlbum(id),
    getAlbums: (_, { offset, limit, orderBy }) => albumsService.getAlbums(offset, limit, orderBy)
  },
  schema: gql`
    extend type Query {
      getAlbum(id: ID!): Album!
      getAlbums(offset: Int!, limit: Int!, orderBy: String!): [Album]!
    }
  `
};
