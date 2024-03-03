'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizadorEvento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   
  }
  OrganizadorEvento.init({
    idEvento: DataTypes.BIGINT,
    idUsuario: DataTypes.BIGINT,
  }, {
    sequelize,
    timestamps: false,
    tableName: 'organizadoreventos',
    modelName: 'OrganizadorEvento',
  });
  return OrganizadorEvento;
};