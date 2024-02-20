const contenidoConexion = require('../database/contenidoConexion')
const { StatusCodes } = require('http-status-codes')
const socketController = require('../controllers/websocketController')

class contenidoController {
    static crearContenido = async (req, res) => {
        try {
            const resultado = await contenidoConexion.crearContenido(req.body)
            socketController(req)

            if (resultado == 1) {
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    data: {
                        msg: 'Contenido registrado correctamente',
                    }
                });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    data: {
                        msg: 'No se pudo registrar el contenido correctamente',
                    }
                })
            }


        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al registrar contenido.', 'sqlMessage': error })
        }
    }

    static getContenido = async (req, res) => {
        try {

            const contenido = await contenidoConexion.getContenido()

            const response = {
                success: true,
                data: {
                    contenido
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al obtener el contenido.', 'sqlMessage': error })
        }
    }

    static getUltimasNoticias = async (req,res) =>{
        try {

            const contenido = await contenidoConexion.getUltimasNoticias()

            const response = {
                success: true,
                data: {
                    contenido
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al obtener el contenido.', 'sqlMessage': error })
        }
    }

    static getInfoNoticia = async (req,res) =>{

        try {
            const id = req.params.id
            const contenido = await contenidoConexion.getInfoNoticia(id)

            const response = {
                success: true,
                data: {
                    contenido
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al obtener el contenido.', 'sqlMessage': error })
        }
    }

    static modificarContenido = async (req, res) => {
        try {
            const id = req.params.id
            const body = req.body
            const usuario = await contenidoConexion.modificarContenido(id, body)

            if (usuario == 0) {
                return res.status(StatusCodes.NOT_FOUND).json({ 'msg': 'Contenido no encontrado' });
            } else {
                return res.status(StatusCodes.OK).json({ 'msg': 'Contenido modificado exitosamente' });
            }
        } catch (error) {
            console.error('Error al modificar el usuario:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor.' });
        }
    }


    static eliminarContenido = async (req, res) => {
        try {
            const id = req.params.id
            const respuesta = await contenidoConexion.eliminarContenido(id)

            if (respuesta == 0) {
                return res.status(StatusCodes.NOT_FOUND).json({ 'msg': 'Contenido no encontrado' });
            } else {
                return res.status(StatusCodes.OK).json({ 'msg': 'Contenido eliminado exitosamente' });
            }

        } catch (error) {
            console.error('Error al modificar el usuario:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor.' });
        }
    }




}

module.exports = contenidoController