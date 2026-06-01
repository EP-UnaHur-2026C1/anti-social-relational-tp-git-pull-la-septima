'use strict';
const { Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey : 'id_user', as : 'user'}),
      Post.hasMany(models.Post_Images, {foreignKey : 'id_post', as : 'images', onDelete: 'CASCADE'}),
      Post.hasMany(models.Comment, { foreignKey : 'id_post', as : 'comments', onDelete: 'CASCADE'})
      Post.belongsToMany(models.Tag, { through : 'post_tag', as : 'tags'})
    }
  }
  Post.init({
    id : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    texto: { type: DataTypes.STRING(255), allowNull: false },
    id_user: { type: DataTypes.INTEGER, allowNull: false},
    fechaPublicacion: { type: DataTypes.DATE, allowNull: false }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false
  });
  return Post;
};