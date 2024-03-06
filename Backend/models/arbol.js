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
      Arbol.hasMany(models.Ubicacion, {as: 'ArbolUbicacion', foreignKey: 'id_arbol'});
      Arbol.hasMany(models.Foto, {as:'ArbolFoto', foreignKey: 'id_arbol'})
    }
 
  }
  Arbol.init({
    id_familia: DataTypes.BIGINT,
    nombre: DataTypes.STRING,
    ep_floracion: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    foto: DataTypes.STRING,
    desactivado: DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    tableName: 'arboles',
    modelName: 'Arbol',
  });
  return Arbol;
};