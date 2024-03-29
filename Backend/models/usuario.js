'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.RolUsuario, {as: 'RolUsuario', foreignKey: 'id_usuario'})
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    ap1: DataTypes.STRING,
    ap2: DataTypes.STRING,
    email: DataTypes.STRING,
    passwd: DataTypes.STRING,
    foto: DataTypes.STRING,
    desactivado : DataTypes.BOOLEAN
  }, {
    sequelize,
    timestamps: false,
    tableName: 'usuarios',
    modelName: 'Usuario',
  });
  return Usuario;
};