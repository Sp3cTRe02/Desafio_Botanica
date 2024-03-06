const db = require('../database/Conexion.js');
const { Sequelize } = require('sequelize');
const models = require('../models/index.js');
const { QueryTypes } = require('sequelize');

const bd = new db()

/**
 * Conexion hecho por @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */


const getRoles = async () => {
    let roles = []
    bd.conectar()
    try {
        roles = await models.sequelize.query('SELECT id, nombre FROM roles', { type: QueryTypes.SELECT });
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        bd.desconectar()
        return roles
    }
}

const getRolesUsuario = async (id) => {
    let roles = []
    bd.conectar()
    try {
        roles = await models.sequelize.query('SELECT r.id, r.nombre FROM roles r, rol_usuario ru WHERE r.id = ru.id_rol AND ru.id_usuario = ' + id, { type: QueryTypes.SELECT });
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        bd.desconectar()
        return roles
    }
}

module.exports = {
    getRoles,
    getRolesUsuario
}