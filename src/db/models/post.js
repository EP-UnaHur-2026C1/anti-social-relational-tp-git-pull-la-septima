'use strict';
const {
  Model
} = require('sequelize');
const { now } = require('sequelize/lib/utils');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey : 'id_user', as : 'user'}),
      Post.hasMany(models.Post_Images, {foreignKey : 'id_post', as : 'images'}),
      Post.hasMany(models.Comment, { foreignKey : 'id_post', as : 'comments'})
      Post.belongsToMany(models.Tag, { through : 'post_tag', as : 'tags'})
    }
  }
  Post.init({
    id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    texto: { type: DataTypes.STRING, max: 255, allowNull: false },
    id_user: { type: DataTypes.INTEGER, allowNull: false},
    fechaPublicacion: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false
  });
  return Post;
};