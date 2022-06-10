const { Model } = require('sequelize');

const PriceInstallment = (sequelize, DataTypes) => {
  class PriceInstallment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PriceInstallment.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      creditTypeId: DataTypes.INTEGER,
      installmentDurationInMonth: DataTypes.INTEGER,
      installmentPrice: DataTypes.INTEGER,
      durationStartYear: DataTypes.INTEGER,
      durationEndYear: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
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
