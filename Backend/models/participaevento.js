'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParticipaEvento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ParticipaEvento.init({
    idEvento: DataTypes.BIGINT,
    idUsuario: DataTypes.BIGINT,
    fechaParticipacion: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    tableName: 'participaeventos',
    modelName: 'ParticipaEvento',
  });
  return ParticipaEvento;
};