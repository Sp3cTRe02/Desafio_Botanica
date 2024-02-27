const { response, request } = require('express')
const Conexion = require('../database/arbolConexion')
const { StatusCodes } = require('http-status-codes')
const {subirArchivo} = require('../helpers/subir-archivo')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * @author @Ismael @Jaime_Rafael
 */

const subirImagenPrincipal = async(req = request, res = response) => {
    try {
        const nombre = await subirArchivo(req.files, undefined, process.env.UPLOADS_DIR_TREE)
        const ruta = `${nombre}`
        console.log("Imagen subida exitosamente en:", ruta);

        return ruta

    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
        
    }
}
const arbolPost = async (req = request, res = response) => {
    try {
        const rutaImagen = await subirImagenPrincipal(req, res)

        const arbol = {
            ...req.body,
            foto: rutaImagen
        }
        const resultado = await Conexion.crearArbol(arbol)
        res.status(StatusCodes.CREATED).json({
            'msg': 'Arbol creado correctamente',
            'status': 'OK'
        })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            'msg': 'Error en el servidor',
            'status': 'ERROR'
        })
    }
}

const arbolPut = async (req = request, res = response) => {
    Conexion.updateArbol(req.body, req.params.id)
        .then(resultado => {
            if (resultado === 1) {
                res.status(StatusCodes.OK).json({
                    'msg': 'Arbol actualizada correctamente',
                    'status': 'OK'
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    'msg': 'Arbol no ha sido encontrado',
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

const arbolGet = async (req = request, res = response) => {
    Conexion.getArbol(req.params.id)
        .then(arbol => {
            if (arbol) {
                res.status(StatusCodes.OK).json({"msg": "Arbol encontrado", "arbol": arbol})
            } else {
                res.status(StatusCodes.NOT_FOUND).json({"msg": "Arbol no encontrado"})
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

const arbolesGet = (req = request, res = response) => {
    console.log('Obteniendo arboles');
    Conexion.getArboles()
        .then(arboles => {
            res.status(StatusCodes.OK).json({"msg":arboles})
        })
        .catch(error => {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg': 'Error en el servidor',
                'status': 'ERROR'
            })
        })
}

//  METODO PARA HACER UN DELETE FISICO->

// const arbolDelete = async (req = request, res = response) => {
//     Conexion.deleteArboles(req.params.id)
//         .then(resultado => {
//             if (resultado === 1) {
//                 res.status(StatusCodes.OK).json({
//                     'msg': 'Arbol eliminado correctamente',
//                     'status': 'OK'
//                 })
//             } else {
//                 res.status(StatusCodes.NOT_FOUND).json({
//                     'msg': 'Arbol no ha sido encontrado',
//                     'status': 'ERROR'
//                 })
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//                 'msg': 'Error en el servidor',
//                 'status': 'ERROR'
//             })
//         })
        const arbolDelete = async (req = request, res = response) => {

        
            Conexion.deleteArboles(req.params.id)
                .then(resultado => {
                    console.log(resultado)
                    
                    if (resultado === 1) {
                        res.status(StatusCodes.OK).json({
                            'msg': 'Arbol eliminado correctamente',
                            'status': 'OK'
                        })
                 
                    } else {
                        res.status(StatusCodes.NOT_FOUND).json({
                            'msg': 'Arbol no encontrado',
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


const addUbicacion = async (req = request, res = response) => {
    const ubicacion = {
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        ciudad: req.body.ciudad
    }
    Conexion.addUbicacionArbol(ubicacion, req.params.id)
        .then(resultado => {
            if (resultado === 1) {
                res.status(StatusCodes.OK).json({
                    'msg': 'Ubicacion añadida correctamente',
                    'status': 'OK'
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    'msg': 'Arbol no ha sido encontrado',
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

const subirImagen = async (req = request, res = response) => {
    try{
        const nombre = await subirArchivo(req.files, undefined, process.env.UPLOADS_DIR_TREE)
    
        const cod = await Conexion.subirImagenArbol(req.params.id, nombre)
    
        if (cod === 1) {
            res.status(StatusCodes.OK).json({
                'msg': 'Imagen subida correctamente',
                'status': 'OK'
            })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                'msg': 'Error al subir la imagen',
                'status': 'ERROR'
            })
        }
    }catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            'msg': 'Error en el servidor',
            'status': 'ERROR'
        })
    }
}

const getImagenes = async (req = request, res = response) => {
    try{
        const rutas = await Conexion.getRutaImagenes(req.params.id)
        let rutasArray = []
        let imagenes = []
        rutas.forEach(ruta => {
            const id = ruta.dataValues.id
            const imagen = process.env.URL_PETICION + process.env.PORT + "/api/arbol/galeria/" + ruta.dataValues.ruta
            const foto = {
                id,
                imagen
            }
                imagenes.push(foto)
        })
        const response = {
            success: true,
            data : {
                imagenes
            }
        }
        console.log(rutasArray.length);
        res.status(StatusCodes.OK).json(response)

        
    }catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            'msg': 'Error en el servidor',
            'status': 'ERROR'
        })
    }
    
}

const cargarImagenArbol = async (req = request, res = response) => {
    const nombre = req.params.nombre
    const ruta = path.join(__dirname, process.env.UPLOADS_PATH, process.env.UPLOADS_DIR_TREE, nombre)
    console.log(ruta);
    try {
        if (fs.existsSync(ruta)) {
            res.sendFile(ruta)
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                'msg': 'Imagen no encontrada',
                'status': 'ERROR'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            'msg': 'Error en el servidor',
            'status': 'ERROR'
        })
    }
}

module.exports = {

    arbolPost,
    arbolPut,
    arbolesGet,
    arbolGet,
    arbolDelete,
    addUbicacion,
    subirImagen,
    getImagenes,
    cargarImagenArbol
    
}