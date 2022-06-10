const { Model } = require('sequelize');

const CreditType = (sequelize, DataTypes) => {
  class CreditType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.DownPaymentType, {
        foreignKey: 'dp_type_id',
      });
      this.hasMany(models.PriceInstallment, { foreignKey: 'credit_type_id' });
    }
  }
  CreditType.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      dpTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        field: 'dp_type_id',
      },
      creditType: {
        type: DataTypes.STRING(64),
        field: 'credit_type',
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
      modelName: 'CreditType',
      tableName: 'credit_types',
    }
  );
  return CreditType;
};

module.exports = CreditType;
