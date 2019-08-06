const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events'),
  { validateUser } = require('../../schemas/users'),
  User = require('../../models').user;

module.exports = {
  mutations: {
    createUser: async (_, user) => {
      try {
        await validateUser(user);
        return User.createUser(user);
      } catch (err) {
        throw err;
      }
    },
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
