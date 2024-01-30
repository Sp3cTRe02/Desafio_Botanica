'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arbol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      Arbol.hasMany(models.Ubicacion, {as: 'ArbolUbicacion', foreignKey: 'idArbol'});
      Arbol.hasMany(models.Foto, {as:'ArbolFoto', foreignKey: 'idArbol'})
    }
 
  }
  Arbol.init({
    idFamilia: DataTypes.BIGINT,
    epFloracion: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    nombre: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    tableName: 'arboles',
    modelName: 'Arbol',
  });
  return Arbol;
};