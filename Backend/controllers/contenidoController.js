const contenidoConexion = require('../database/contenidoConexion')
const { StatusCodes } = require('http-status-codes')
const socketController = require('../controllers/websocketController')
const { subirArchivoNoticia } = require('../helpers/subir-archivo-noticia')

/**
 * @David_Trujillo
 */

class contenidoController {
    static async subirImagen(req, res) {
        try {
            const nombre = await subirArchivoNoticia(req.files, undefined, process.env.UPLOADS_DIR);
            const ruta = `${process.env.UPLOADS_PATH}${process.env.UPLOADS_DIR}/${nombre}`;
            console.log("Imagen subida exitosamente en:", ruta);

            return ruta


        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw error;
        }
    }

    static async crearContenido(req, res) {
        try {
            let id = req.idToken

            const rutaImagen = await contenidoController.subirImagen(req, res)

            const contenido = {
                ...req.body,
                idUsuario: id,
                imagen: rutaImagen
            }

            const resultado = await contenidoConexion.crearContenido(contenido);
            socketController(req);

            if (resultado == 1) {
                console.log("Contenido registrado correctamente");
                res.status(StatusCodes.CREATED).json({
                    success: true,
                    data: {
                        msg: 'Contenido registrado correctamente',
                    }
                });
            } else {
                console.log("No se pudo registrar el contenido correctamente");
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    data: {
                        msg: 'No se pudo registrar el contenido correctamente',
                    }
                })
            }
        } catch (error) {
            console.error("Error en el servidor al registrar contenido:", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al registrar contenido.', sqlMessage: error })
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
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static getUltimasNoticias = async (req, res) => {
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
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static getInfoNoticia = async (req, res) => {

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
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static modificarContenido = async (req, res) => {
        try {
            const id = req.params.id
            const body = req.body
            const usuario = await contenidoConexion.modificarContenido(id, body)

            if (usuario == 0) {
                return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: 'Contenido no encontrado' });
            } else {
                return res.status(StatusCodes.OK).json({ success: true, msg: 'Contenido modificado exitosamente' });
            }
        } catch (error) {
            console.error('Error al modificar el usuario:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor.' });
        }
    }


    static eliminarContenido = async (req, res) => {
        try {
            const id = req.params.id
            const respuesta = await contenidoConexion.eliminarContenido(id)

            if (respuesta == 0) {
                return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: 'Contenido no encontrado' });
            } else {
                return res.status(StatusCodes.OK).json({ success: true, msg: 'Contenido eliminado exitosamente' });
            }

        } catch (error) {
            console.error('Error al modificar el usuario:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor.' });
        }
    }


}


module.exports = contenidoController