'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post,{foreignKey : 'user_nickname', as : 'posts'} ),
      User.hasMany(models.Comment, {foreignKey : 'user_nickname', as : 'comments'})
    }
  }
  User.init({
    nickname: {type: DataTypes.STRING, unique: true, primaryKey: true, allowNull: false},
  }, 
  {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};