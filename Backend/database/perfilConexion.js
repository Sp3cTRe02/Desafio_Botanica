const db = require('../database/Conexion.js');
const models = require('../models/usuario.js'); 
const { QueryTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const bd = new db()

/**
 * @author @Ismael
 * @param {*} id

 */
const obtenerUsuarioPorId = async (id) => {
    bd.conectar()
    try {
        const usuario = await models.Usuario.findByPk(id);
        return usuario;
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            console.error('Error de validación al obtener el usuario por ID:', error);
        } else {
            console.error('Error al obtener el usuario por ID:', error);
        }
        throw error;
    } finally {
        bd.desconectar();
    }
}
module.exports = {

   obtenerUsuarioPorId,
    
}