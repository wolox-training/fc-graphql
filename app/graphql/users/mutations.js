const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events'),
  userService = require('../../services/users');

module.exports = {
  mutations: {
    createUser: (_, params) => userService.create(params),
    login: (_, { credentials }) => {
      // IMPORTANT: Not a functional login, its just for illustrative purposes
      userLoggedIn.publish(credentials.username);
      return {
        accessToken: 'example_token',
        refreshToken: 'example_refresh_token',
        expiresIn: 134567899123
      };
    }
  },
  schema: gql`
    extend type Mutation {
      createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
      login(credentials: LoginInput!): AccessToken
    }
  `
};
