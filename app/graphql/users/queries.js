const { gql } = require('apollo-server'),
  User = require('../../models').user;

module.exports = {
  queries: {
    user: (_, params) => User.getOne(params),
    users: (_, params) => User.getAll(params)
  },
  schema: gql`
    extend type Query {
      user(id: ID, firstName: String, email: String): User!
      users: [User]
    }
  `
};
