const { Model } = require('sequelize');

const DownPaymentType = (sequelize, DataTypes) => {
  class DownPaymentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.CarPrice, { foreignKey: 'car_price_id' });
      this.hasMany(models.CreditType, { foreignKey: 'dp_type_id' });
    }
  }
  DownPaymentType.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      carPriceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        field: 'car_price_id',
      },
      downPayment: {
        type: DataTypes.INTEGER,
        field: 'down_payment',
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
      modelName: 'DownPaymentType',
      tableName: 'down_payment_types',
    }
  );
  return DownPaymentType;
};

module.exports = DownPaymentType;
