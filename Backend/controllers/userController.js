const {response, request} = require('express')
const Conexion = require('../database/userConexion')
const { StatusCodes } = require('http-status-codes')


const usuarioPost = async (req = request, res = response) => {

    Conexion.createUsuario(req.body)
        .then (msg => {
            console.log('Usuario creado correctamente');
            res.status(StatusCodes.CREATED).json({
                'msg' : 'Usuario creado correctamente',
                'status' : 'OK'
            })
        })
        .catch (err => {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg' : 'Error en el servidor',
                'status' : 'ERROR'
            })
        })
}

const usuarioPut = async (req = request, res = response) => {
    Conexion.updateUsuario(req.body, req.params.id)
        .then(resultado => {
            if (resultado === 1) {
                res.status(StatusCodes.OK).json({
                    'msg': 'Usuario actualizado correctamente',
                    'status': 'OK'
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    'msg': 'Usuario no encontrado',
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

const usuarioGet = async (req = request, res = response) => {
    Conexion.getUsuarios()
        .then(usuarios => {
            if (usuarios.length > 0) {
                res.status(StatusCodes.OK).json({
                    'usuarios': usuarios,
                    'status': 'OK'
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    'msg': 'No se encontraron usuarios',
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

const usuarioDelete = async (req = request, res = response) => {

    // Conexion.getActivado(req.params.id)
    // .then(resultado => {
    //     console.log(resultado)
        
    //     if (resultado === 1) {
    //         res.status(StatusCodes.OK).json({
    //             'msg': 'Usuario ya anteriormente eliminado',
    //             'status': 'OK'
    //         })
    //     } else {
    //         res.status(StatusCodes.NOT_FOUND).json({
    //             'msg': 'Usuario no encontrado',
    //             'status': 'ERROR'
    //         })
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //         'msg': 'Error en el servidor',
    //         'status': 'ERROR'
    //     })
    // })

    Conexion.deleteUsuarios(req.params.id)
        .then(resultado => {
            console.log(resultado)
            
            if (resultado === 1) {
                res.status(StatusCodes.OK).json({
                    'msg': 'Usuario eliminado correctamente',
                    'status': 'OK'
                })
            // } else if (resultado === 0) {
            //     res.status(StatusCodes.OK).json({
            //         'msg': 'Usuario ya anteriormente eliminado',
            //         'status': 'OK'
            //     })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    'msg': 'Usuario no encontrado',
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
    usuarioPost,usuarioGet,usuarioDelete,usuarioPut,  
}
