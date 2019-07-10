const { ApolloError } = require('apollo-server');

const createError = (message, statusCode, internalCode) =>
  new ApolloError(message, statusCode, { internalCode });

const statusCodes = {
  NOT_FOUND: 404,
  ALBUM_API_ERROR: 503,
  BAD_REQUEST_ERROR: 400,
  DEFAULT_ERROR: 500,
  INVALID_PARAMS: 422,
  DATABASE_ERROR: 503
};

const DEFAULT_ERROR = 'default_error';
const NOT_FOUND = 'not_found';
const BAD_REQUEST_ERROR = 'bad_request_error';
const ALBUM_API_ERROR = 'album_api_error';
const INVALID_PARAMS = 'invalid_params';
const DATABASE_ERROR = 'invalid_params';

exports.notFound = message => createError(message, statusCodes.NOT_FOUND, NOT_FOUND);

exports.badRequestError = message => createError(message, statusCodes.BAD_REQUEST_ERROR, BAD_REQUEST_ERROR);

exports.defaultError = message => createError(message, statusCodes.DEFAULT_ERROR, DEFAULT_ERROR);

exports.albumApiError = message => createError(message, statusCodes.ALBUM_API_ERROR, ALBUM_API_ERROR);

exports.invalidParams = message => createError(message, statusCodes.INVALID_PARAMS, INVALID_PARAMS);

exports.databaseError = message => createError(message, statusCodes.DATABASE_ERROR, DATABASE_ERROR);
