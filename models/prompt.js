'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define(
    'Prompt',
    {
      userId: DataTypes.INTEGER,
      friendId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );
  Prompt.associate = function (models) {
    // associations can be defined here
    // Prompt.hasOne(models.User, {
      // foreignKey: 'user_id',
    // });
  };
  return Prompt;
};
