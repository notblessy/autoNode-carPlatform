'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('down_payment_types', {
      id: {
        allowNull: false,
        autoIncremet: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      carPriceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'car_prices',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        field: 'car_price_id',
      },
      downPayment: {
        type: Sequelize.INTEGER,
        field: 'down_payment',
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
    await queryInterface.dropTable('down_payment_types');
  },
};
