'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolUsuario.init({
    id_rol: DataTypes.BIGINT,
    id_usuario: DataTypes.BIGINT
  }, {
    sequelize,
    timestamps: false,
    tableName: 'rol_usuario',
    modelName: 'RolUsuario',
  });
  return RolUsuario;
};