'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    'Friend',
    {
      user: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      last_notified_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      next_notify_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      createdAt: 'created_at',
      updatedAt: false,
    }
  );
  Friend.associate = function (models) {
    // associations can be defined here
  };
  return Friend;
};
