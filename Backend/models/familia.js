'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Familia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      Familia.hasMany(models.Arbol, {as: 'FamiliaArbol', foreignKey: 'idFamilia'})
    }

  
  }
  Familia.init({
    nombre: DataTypes.STRING,
    desactivado: DataTypes.BOOLEANS
  }, {
    sequelize,
    timestamps: false,
    tableName: 'familias',
    modelName: 'Familia',
  });
  return Familia;
};