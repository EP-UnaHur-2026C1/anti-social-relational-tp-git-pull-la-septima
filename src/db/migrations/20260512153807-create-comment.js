'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comentario: {
        type: Sequelize.STRING
      },
      fecha_publicacion: {
        type: Sequelize.DATE
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      id_post: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};