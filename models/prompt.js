'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define(
    'Prompt',
    {
      userId: DataTypes.INTEGER,
      friendId: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  Prompt.associate = function (models) {
    // associations can be defined here
    Prompt.hasOne(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Prompt;
};
