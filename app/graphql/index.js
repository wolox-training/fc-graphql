const { makeExecutableSchema } = require('graphql-tools'),
  albums = require('./albums'),
  photosService = require('../services/photos'),
  types = require('./types'),
  inputs = require('./inputs'),
  users = require('./users'),
  healthCheck = require('./healthCheck');

const typeDefs = [types, inputs, ...users.schemas, ...healthCheck.schemas, ...albums.schemas];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...albums.queries,
      ...users.queries,
      ...healthCheck.queries
    },
    Album: {
      photos: album => photosService.getPhotosForAlbum(album.id)
    },
    Mutation: {
      ...users.mutations
    },
    Subscription: {
      ...users.subscriptions
    }
  }
});
