const { gql } = require('apollo-server'),
  albumsService = require('../../services/albums');

module.exports = {
  queries: {
    getAlbum: (_, { id }) => albumsService.getAlbum(id),
    getAlbums: (_, params) =>
      albumsService.getAlbums(params.offset, params.limit, params.orderBy, params.filterBy)
  },
  schema: gql`
    extend type Query {
      getAlbum(id: ID!): Album!
      getAlbums(offset: Int!, limit: Int!, orderBy: String!, filterBy: String): [Album]
    }
  `
};
