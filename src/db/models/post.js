'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {foreignKey : 'user_nickname', as : 'user'}),
      Post.hasMany(models.Post_Images, {foreignKey : 'id_post', as : 'images'}),
      Post.hasMany(models.Comment, { foreignKey : 'id_post', as : 'comments'})
      Post.belongsToMany(models.Tag, { through : 'post_tag', foreignKey : 'id_post', as : 'tags'})
    }
  }
  Post.init({
    texto: { type: DataTypes.STRING, max: 255, allowNull: false },
    fechaPublicacion: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: false
  });
  return Post;
};