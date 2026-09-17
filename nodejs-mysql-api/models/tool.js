'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tool extends Model {
    static associate(models) {
      Tool.belongsTo(models.Category, {foreignKey: 'categoryId'});
      Tool.hasMany(sequelize.define('Record'));
    }
    toJSON() {
      const values = {...this.get()};

      return {
        id: values.id,
        description: values.description,
        categoryId: values.categoryId,
        available: values.available,
        createdAt: values.createdAt,
        updatedAt: values.updatedAt,
        Category: values.Category
      }
    }
  }
  Tool.init({
    description: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      get() {
        const rawValue = this.getDataValue('available');
        return rawValue ? 'Disponível' : 'Indisponível';
      }
    }
  }, {
    sequelize,
    modelName: 'Tool',
  });
  return Tool;
};