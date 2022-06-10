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
      userId: DataTypes.STRING,
      carBrandName: DataTypes.STRING,
      carGroupModel: DataTypes.STRING,
      carYear: DataTypes.INTEGER,
      carPlateNumber: DataTypes.STRING(32),
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
  return Car;
};

module.exports = Car;
