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


module.exports = {
    usuarioPost
}
