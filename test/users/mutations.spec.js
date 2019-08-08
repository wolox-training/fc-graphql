/* eslint-disable init-declarations */
const { mutate } = require('../server.spec'),
  faker = require('faker'),
  { alphanumericRegex } = require('../../app/helpers/validation'),
  { createUser } = require('./graphql'),
  User = require('../../app/models').user,
  constants = require('../../app/constants'),
  errors = require('../../app/errors');

const user = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: `${faker.name.lastName()}@wolox.com.ar`,
  password: faker.internet.password(8, false, alphanumericRegex)
};

const checkError = (error, statusCode, internalCode) => {
  const errorBody = error[0];
  expect(errorBody.extensions.code).toEqual(statusCode);
  expect(errorBody.extensions.exception.internalCode).toEqual(internalCode);
};

const fieldNotProvidedError = error => {
  const errorBody = error[0];
  expect(errorBody.extensions.code).toEqual('INTERNAL_SERVER_ERROR');
};

describe('users', () => {
  describe('mutations', () => {
    describe('When the given params to create a user are valid', () => {
      let oldCount;
      let mutation;

      beforeEach(async () => {
        oldCount = await User.count();
        mutation = await mutate(createUser(user));
      });

      it('creates an user successfuly', async () => {
        const newCount = await User.count();
        expect(mutation.data.createUser.firstName).toEqual(user.firstName);
        expect(mutation.data.createUser.lastName).toEqual(user.lastName);
        expect(mutation.data.createUser.email).toEqual(user.email);
        expect(mutation.data.createUser.password).toEqual(user.password);
        expect(mutation.data.createUser.id).toBeDefined();
        expect(newCount).toEqual(oldCount + 1);
      });
    });

    describe('When the given params to create a user are invalid', () => {
      let error;

      describe('When email format is invalid', () => {
        const userToCreate = {
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          email: 'franco.coronel@gmail.com'
        };

        beforeEach(async () => {
          error = await mutate(createUser(userToCreate));
        });

        it('returns invalid params error', () => {
          checkError(error.errors, constants.STATUS_CODES[errors.INVALID_PARAMS], errors.INVALID_PARAMS);
        });
      });

      describe('When password is not alphanumeric', () => {
        const userToCreate = {
          firstName: user.firstName,
          lastName: user.lastName,
          password: '$pruebas123$',
          email: user.email
        };

        beforeEach(async () => {
          error = await mutate(createUser(userToCreate));
        });

        it('returns invalid params error', () => {
          checkError(error.errors, constants.STATUS_CODES[errors.INVALID_PARAMS], errors.INVALID_PARAMS);
        });
      });

      describe('When password has a length less than eight characters', () => {
        const userToCreate = {
          firstName: user.firstName,
          lastName: user.lastName,
          password: 'p123',
          email: user.email
        };

        beforeEach(async () => {
          error = await mutate(createUser(userToCreate));
        });

        it('returns invalid params error', () => {
          checkError(error.errors, constants.STATUS_CODES[errors.INVALID_PARAMS], errors.INVALID_PARAMS);
        });
      });
    });

    const bodyParams = ['firstName', 'lastName', 'email', 'password'];

    bodyParams.forEach(param => {
      let error;
      describe(`When send a body without ${param}`, () => {
        const userToCreate = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        };
        delete userToCreate[param];

        beforeEach(async () => {
          error = await mutate(createUser(userToCreate));
        });

        it('returns GraphQL Error', () => {
          fieldNotProvidedError(error.errors);
        });
      });
    });
  });
});
