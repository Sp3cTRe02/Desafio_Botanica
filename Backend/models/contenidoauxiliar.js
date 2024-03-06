'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContenidoAuxiliar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContenidoAuxiliar.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    tableName: 'contenido_auxiliar',
    modelName: 'ContenidoAuxiliar',
  });
  return ContenidoAuxiliar;
};