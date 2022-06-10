'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credit_types', {
      id: {
        allowNull: false,
        autoIncremet: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      dpTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'down_payment_types',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        field: 'dp_type_id',
      },
      creditType: {
        type: Sequelize.STRING(64),
        field: 'credit_type',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credit_types');
  },
};
