'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contenido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contenido.init({
    id_usuario: DataTypes.BIGINT,
    titulo: DataTypes.STRING,
    resumen_desc: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING,
 
  }, {
    sequelize,
    timestamps: false,
    tableName: 'contenidos',
    modelName: 'Contenido',
  });
  return Contenido;
};