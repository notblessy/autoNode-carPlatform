const { Model } = require('sequelize');

const CarPrice = (sequelize, DataTypes) => {
  class CarPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarPrice.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      carId: DataTypes.INTEGER,
      priceType: DataTypes.ENUM('CASH', 'CREDIT'),
      price: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
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
