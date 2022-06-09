'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('car_prices', {
      id: {
        allowNull: false,
        autoIncremet: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      carId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cars',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        field: 'car_id'
      },
      priceType: {
        type: Sequelize.ENUM('CASH', 'CREDIT'),
        field: 'price_type'
      },
      price: {
        type: Sequelize.INTEGER,
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'deleted_at'
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('car_prices');
  },
};
