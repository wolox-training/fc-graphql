const { gql } = require('apollo-server');

module.exports = {
  queries: {
    healthCheck: () => process.uptime()
  },
  schemas: [
    gql`
      extend type Query {
        healthCheck: String!
      }
    `
  ]
};
const { queries, schema: queriesSchema } = require('./queries');

module.exports = {
  queries,
  schemas: [queriesSchema]
};
