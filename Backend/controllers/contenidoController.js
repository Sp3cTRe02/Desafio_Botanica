const contenidoConexion = require('../database/contenidoConexion')
const { StatusCodes } = require('http-status-codes')
const socketController = require('../controllers/websocketController')
const { subirArchivoNoticia , subirArchivoNoticiaPost} = require('../helpers/subir-archivo-noticia')
const path = require('path');
const fs = require('fs');

/**
 * @David_Trujillo
 */

class contenidoController {
    static async subirImagen(req, res) {
        try {
            const nombre = await subirArchivoNoticia(req.files, undefined, process.env.UPLOADS_DIR_CONTENT);
            const ruta = `${nombre}`;
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
                id_usuario: id,
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
            for (let i = 0; i < contenido.length; i++) {
                const id = contenido[i].dataValues.id
                const imagen = process.env.URL_PETICION + process.env.PORT + "/api/contenido/upload/" + id
                contenido[i].dataValues.imagen = imagen
            }


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
            for (let i = 0; i < contenido.length; i++) {
                const id = contenido[i].dataValues.id
                const imagen = process.env.URL_PETICION + process.env.PORT + "/api/contenido/upload/" + id
                contenido[i].dataValues.imagen = imagen
            }

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

            //Se hace una petición get correspondiente a mostrarImagen()
            const imagen = process.env.URL_PETICION + process.env.PORT + "/api/contenido/upload/" + id

            contenido.imagen = imagen

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

    //Construcción de la imagen 
    static mostrarImagen = async (req, res = response) => {
        try {
            const imagen = await contenidoConexion.getImagen(req.params.id);
            console.log(imagen.dataValues.imagen)

            if (imagen) {
                const pathImagen = path.join(__dirname, '../uploads/', 'imgs/content', imagen.dataValues.imagen);
                console.log(pathImagen);

                if (fs.existsSync(pathImagen)) {
                    return res.sendFile(pathImagen);
                }
            }

            res.status(StatusCodes.NOT_FOUND).json({ error: "No se ha encontrado la imagen" });
        } catch (error) {
            console.error('Error al mostrar la imagen:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error interno del servidor" });
        }
    }

    static modificarContenido = async (req, res) => {
        try {
            const id = req.params.id;
    
            if (req.files == null) {
                const resultado = await this.modificarContenidoSinImagen(req, id);
    
                if (resultado == 0) {
                    return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: 'Contenido no encontrado' });
                } else {
                    return res.status(StatusCodes.OK).json({ success: true, msg: 'Contenido modificado exitosamente' });
                }
    
            } else {
                const imagen = await contenidoConexion.getImagen(id);
    
                if (imagen.dataValues.imagen != null) {
                    await this.eliminarImagenAnterior(imagen);
    
                    const nombre = await subirArchivoNoticiaPost(req.files, undefined, process.env.UPLOADS_DIR_CONTENT);
                    const ruta = `${nombre}`;
    
                    const resultado = await this.modificarContenidoConImagen(req, id, ruta);
    
                    return this.enviarRespuesta(resultado, res);
                } else {
                    const nombre = await subirArchivoNoticiaPost(req.files, undefined, process.env.UPLOADS_DIR_CONTENT);
                    const ruta = `${nombre}`;
    
                    const resultado = await this.modificarContenidoConImagen(req, id, ruta);
    
                    return this.enviarRespuesta(resultado, res);
                }
            }
    
        } catch (error) {
            console.error('Error al modificar el usuario:', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor.' });
        }
    }
    
    static modificarContenidoSinImagen = async (req, id) => {
        const noticia = { ...req.body };
        return await contenidoConexion.modificarContenido(id, noticia);
    }
    
    static eliminarImagenAnterior = async (imagen) => {
        const rutaAnterior = path.join(__dirname, process.env.UPLOADS_PATH, process.env.UPLOADS_DIR_CONTENT, imagen.dataValues.imagen);
        if (fs.existsSync(rutaAnterior)) {
            fs.unlinkSync(rutaAnterior);
        }
    }
    
    static modificarContenidoConImagen = async (req, id, ruta) => {
        const noticia = { ...req.body, imagen: ruta };
        return await contenidoConexion.modificarContenido(id, noticia);
    }
    
    static enviarRespuesta = (resultado, res) => {
        if (resultado == 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: 'Contenido no encontrado' });
        } else {
            return res.status(StatusCodes.OK).json({ success: true, msg: 'Contenido modificado exitosamente' });
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


    static getInfoInicio = async (req, res) => {
        try {

            const contenido = await contenidoConexion.getInfoInicio()

            const response = {
                success: true,
                data: {
                    contenido
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el conte.', sqlMessage: error })
        }
    }


    static modificarContenidoInicio = async (req, res) => {
        try {
            const id = req.params.id
            const body = req.body
            const usuario = await contenidoConexion.modificarContenidoInicio(id, body)

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



}


module.exports = contenidoController