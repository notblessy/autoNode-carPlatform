'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('price_installments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      creditTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'credit_types',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        field: 'credit_type_id',
      },
      installmentDurationInMonth: {
        type: Sequelize.INTEGER,
        field: 'installment_duration_in_month',
      },
      installmentPrice: {
        type: Sequelize.INTEGER,
        field: 'installment_price',
      },
      durationStartYear: {
        type: Sequelize.INTEGER,
        field: 'duration_start_year',
      },
      durationEndYear: {
        type: Sequelize.INTEGER,
        field: 'duration_End_year',
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
    await queryInterface.dropTable('price_installments');
  },
};
