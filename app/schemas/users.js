const yup = require('yup'),
  { invalidParams } = require('../errors'),
  { alphanumericRegex, emailRegex } = require('../helpers/validation');

const userCreationSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, 'Password should be, at least, 8 characters long')
    .matches(alphanumericRegex, 'Password should only have alphanumeric characters'),
  email: yup
    .string()
    .required()
    .email('Invalid email')
    .matches(emailRegex, 'Email must be Wolox domain')
});

exports.validateUser = user =>
  userCreationSchema.validate(user).catch(error => {
    throw invalidParams(error.message);
  });
