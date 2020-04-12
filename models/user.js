'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      verified_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
