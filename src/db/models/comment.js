'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    comentario: { type: DataTypes.STRING, max: 255, allowNull: false },
    fecha_publicacion: { type: DataTypes.DATEONLY, allowNull: false },
    visible: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false
  });
  return Comment;
};