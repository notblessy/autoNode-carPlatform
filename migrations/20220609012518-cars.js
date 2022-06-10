'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        field: 'user_id',
      },
      carBrandName: {
        type: Sequelize.STRING,
        field: 'car_brand_name',
      },
      carGroupModel: {
        type: Sequelize.STRING,
        field: 'car_group_model',
      },
      carYear: {
        type: Sequelize.INTEGER,
        field: 'car_year',
      },
      carPlateNumber: {
        type: Sequelize.STRING(32),
        field: 'car_plate_number',
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
    await queryInterface.dropTable('cars');
  },
};
