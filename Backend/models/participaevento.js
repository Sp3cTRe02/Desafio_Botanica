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
    id_evento: DataTypes.BIGINT,
    id_usuario: DataTypes.BIGINT,
    fecha_participacion: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    tableName: 'participa_eventos',
    modelName: 'ParticipaEvento',
  });
  return ParticipaEvento;
};