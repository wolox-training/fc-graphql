const errors = require('../errors'),
  logger = require('../../logger');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
        validate: {
          emailFormat(value) {
            if (!value.endsWith('@wolox.com.ar')) {
              throw errors.invalidParams(`Email format invalid: ${value}`);
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  User.createUser = user => {
    try {
      return User.create(user);
    } catch (err) {
      logger.error('Error while trying to create an user');
      throw errors.databaseError(err.message);
    }
  };

  User.getOne = user => User.findOne({ where: user });

  User.getAll = () => User.findAll();

  User.getByUsername = username => User.getOne({ username });

  User.prototype.updateModel = props => this.update(props);

  return User;
};
