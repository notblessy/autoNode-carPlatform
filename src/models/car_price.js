const { Model } = require('sequelize');

const CarPrice = (sequelize, DataTypes) => {
  class CarPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Car, { foreignKey: 'car_id' });
      this.hasMany(models.DownPaymentType, { foreignKey: 'car_price_id' });
    }
  }
  CarPrice.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'car_id',
      },
      priceType: {
        type: DataTypes.ENUM('CASH', 'CREDIT'),
        field: 'price_type',
      },
      price: DataTypes.INTEGER,
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
      modelName: 'CarPrice',
      tableName: 'car_prices',
    }
  );
  return CarPrice;
};

module.exports = CarPrice;
