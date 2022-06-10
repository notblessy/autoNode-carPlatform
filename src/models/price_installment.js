const { Model } = require('sequelize');

const PriceInstallment = (sequelize, DataTypes) => {
  class PriceInstallment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.CreditType, { foreignKey: 'credit_type_id' });
    }
  }
  PriceInstallment.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
      creditTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        field: 'credit_type_id',
      },
      installmentDurationInMonth: {
        type: DataTypes.INTEGER,
        field: 'installment_duration_in_month',
      },
      installmentPrice: {
        type: DataTypes.INTEGER,
        field: 'installment_price',
      },
      durationStartYear: {
        type: DataTypes.INTEGER,
        field: 'duration_start_year',
      },
      durationEndYear: {
        type: DataTypes.INTEGER,
        field: 'duration_End_year',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at',
      },
    },
    {
      sequelize,
      modelName: 'PriceInstallment',
      tableName: 'price_installments',
    }
  );
  return PriceInstallment;
};

module.exports = PriceInstallment;
