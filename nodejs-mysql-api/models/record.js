'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate(models) {
      Record.belongsTo(models.User, { foreignKey: 'userId'});
      Record.belongsTo(models.Tool, { foreignKey: 'toolId'});
    }
    toJSON() {
      const values = {...this.get()};

      return {
        id: values.id,
        toolId: values.toolId,
        userId: values.userId,
        movementType: values.movementType,
        createdAt: values.createdAt,
        Tool: values.Tool,
        User: values.User,
      }
    }
  }
  Record.init({
    toolId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    movementType: {
      type: DataTypes.BOOLEAN,
      get() {
        const rawValue = this.getDataValue('movementType');
        return rawValue ? 'Saída/Emprestímo' : 'Entrada/Devolução';
      }
    }
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};