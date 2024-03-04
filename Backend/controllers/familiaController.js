const { response, request } = require('express')
const Conexion = require('../database/familiaConexion')
const { StatusCodes } = require('http-status-codes')

/**
 * Controlador hecho por @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */


const familiaPost = async (req = request, res = response) => {
    Conexion.createFamilia(req.body)
        .then(msg => {
            console.log('Familia creada correctamente');
            res.status(StatusCodes.CREATED).json({
                'msg': 'Familia creada correctamente',
                'status': 'OK'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg': 'Error en el servidor',
                'status': 'ERROR'
            })
        })
}

const familiaPut = async (req = request, res = response) => {
    Conexion.updateFamilia(req.body, req.params.id)
        .then(resultado => {
            if (resultado === 1) {
                res.status(StatusCodes.OK).json({
                    'msg': 'Familia actualizada correctamente',
                    'status': 'OK'
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    'msg': 'Familia no encontrada',
                    'status': 'ERROR'
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg': 'Error en el servidor',
                'status': 'ERROR'
            })
        })
}

const familiaGet = async (req = request, res = response) => {
    Conexion.getFamilias()
        .then(familias => {
            res.status(StatusCodes.OK).json({"msg":familias})
        })
        .catch(error => {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg': 'Error en el servidor',
                'status': 'ERROR'
            })
        })
}

const familiaAdmin = (req = request, res = response) => {
    Conexion.getFamiliasAdmin()
        .then(familias => {
            res.status(StatusCodes.OK).json({"msg":familias})
        })
        .catch(error => {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg': 'Error en el servidor',
                'status': 'ERROR'
            })
        })
}

const familiaDelete = async (req = request, res = response) => {
    Conexion.deleteFamilias(req.params.id)
        .then(resultado => {
            if (resultado === 1) {
                res.status(StatusCodes.OK).json({
                    'msg': 'Familia eliminada correctamente',
                    'status': 'OK'
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    'msg': 'Familia no encontrada',
                    'status': 'ERROR'
                })
            }
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
    familiaPost,
    familiaPut,
    familiaGet,
    familiaAdmin,
    familiaDelete
}