const { Model } = require('sequelize');

const Car = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.CarPrice, { foreignKey: 'car_id' });
    }
  }
  Car.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
      userId: {
        type: DataTypes.STRING,
        field: 'user_id',
      },
      carBrandName: {
        type: DataTypes.STRING,
        field: 'car_brand_name',
      },
      carGroupModel: {
        type: DataTypes.STRING,
        field: 'car_group_model',
      },
      carYear: {
        type: DataTypes.INTEGER,
        field: 'car_year',
      },
      carPlateNumber: {
        type: DataTypes.STRING(32),
        field: 'car_plate_number',
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
      modelName: 'Car',
      tableName: 'cars',
    }
  );
  return Car;
};

module.exports = Car;
