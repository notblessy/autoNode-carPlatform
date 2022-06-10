const { Model } = require('sequelize');

const CreditType = (sequelize, DataTypes) => {
  class CreditType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CreditType.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      dpTypeId: DataTypes.INTEGER,
      creditType: DataTypes.STRING(64),
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
  return CreditType;
};

module.exports = CreditType;
