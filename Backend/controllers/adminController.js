const { response, request } = require('express')
const Conexion = require('../database/rolConexion')
const { StatusCodes } = require('http-status-codes')

/**
 * Controllador hecho por @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */

const consultarRoles = async (req = request, res = response) => {
    Conexion.getRoles()
        .then(roles => {
            res.status(StatusCodes.OK).json({
                'msg': 'Roles consultados correctamente',
                'status': 'OK',
                'roles': roles
            })
        })
        .catch(error => {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg': 'Error en el servidor',
                'status': 'ERROR'
            })
        })
}

const getRolesUsuario = async (req = request, res = response) => {
    Conexion.getRolesUsuario(req.params.id)
        .then(roles => {
            res.status(StatusCodes.OK).json({
                'msg': 'Roles consultados correctamente',
                'status': 'OK',
                'roles': roles
            })
        })
        .catch(error => {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg': 'Error en el servidor',
                'status': 'ERROR'
            })
        })
}
module.exports = {
    consultarRoles,
    getRolesUsuario
}