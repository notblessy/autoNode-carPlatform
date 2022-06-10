const { Model } = require('sequelize');

const User = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      carPriceId: DataTypes.INTEGER,
      downPayment: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Car',
      tableName: 'cars',
    }
  );
  return DownPaymentType;
};

module.exports = DownPaymentType;
