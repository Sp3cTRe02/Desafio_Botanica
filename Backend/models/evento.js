'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Evento.init({
    idUsuario: DataTypes.BIGINT,
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    cantidadMax: DataTypes.INTEGER,
    latitud: DataTypes.STRING,
    longitud: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    imagen: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    tableName: 'eventos',
    modelName: 'Evento',
  });
  return Evento;
};