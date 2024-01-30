'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ubicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ubicacion.init({
    idArbol: DataTypes.BIGINT,
    latitud: DataTypes.STRING,
    longitud: DataTypes.STRING,
    ciudad: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    tableName: 'ubicaciones',
    modelName: 'Ubicacion',
  });
  return Ubicacion;
};