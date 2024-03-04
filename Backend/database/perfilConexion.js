const db = require('../database/Conexion.js');
const models = require('../models/index.js'); 
const { QueryTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const bd = new db()

/**
 * @author @Ismael @Jaime_Rafael
 * @param {*} id

 */
const actualizarUsuarioPorId = async (id, body) => {
    bd.conectar();
    try {
        const usuarioActualizado = await models.Usuario.update(body, {
            where: { id: id }
        });
        if (usuarioActualizado[0] === 0) {
            console.log('Usuario no encontrado');
            return 0;
        } else {
            console.log('Usuario actualizado con éxito');
            return 1;
        }
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            console.error('Error de validación al actualizar el usuario por ID:', error);
        } else {
            console.error('Error al actualizar el usuario por ID:', error);
        }
        throw error;
    } finally {
        bd.desconectar();
    }
}

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
    actualizarUsuarioPorId
}
