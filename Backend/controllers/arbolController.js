const { response, request } = require('express')
const Conexion = require('../database/arbolConexion')
const { StatusCodes } = require('http-status-codes')
const {subirArchivo} = require('../helpers/subir-archivo')
const fs = require('fs')
const path = require('path')
const { kMaxLength } = require('buffer')
const { log } = require('console')
require('dotenv').config()

/**
 * @author Controlador hecho por @Jaime_Rafael
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
/**
 * @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */
const arbolPost = async (req = request, res = response) => {
    try {
        const rutaImagen = await subirImagenPrincipal(req, res)

        const arbol = {
            ...req.body,
            foto: rutaImagen
        }
        const resultado = await Conexion.createArbol(arbol)
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
    try {

            if(req.files === null){
                const arbol = {
                    ...req.body
                }
                const resultado = await Conexion.updateArbol(req.params.id, arbol)
                if (resultado === 1) {
                    res.status(StatusCodes.OK).json({
                        'msg': 'Arbol modificado correctamente',
                        'status': 'OK'
                    })
                } else {
                    res.status(StatusCodes.NOT_FOUND).json({
                        'msg': 'Arbol no ha sido encontrado',
                        'status': 'ERROR'
                    })
                }
            }else {
                const rutaImg = await Conexion.getFoto(req.params.id)
                if(rutaImg.dataValues.foto != null){
                    const rutaAnterior = path.join(__dirname, process.env.UPLOADS_PATH, process.env.UPLOADS_DIR_TREE, rutaImg.dataValues.foto)
                    if(fs.existsSync(rutaAnterior)){
                        fs.unlinkSync(rutaAnterior)
                    }
                    const nombre = await subirArchivo(req.files, undefined, process.env.UPLOADS_DIR_TREE)
                    const ruta = `${nombre}`
                    const arbol = {
                        ...req.body,
                        foto: ruta
                    }
                    const resultado = await Conexion.updateArbol(req.params.id, arbol)
                    if (resultado === 1) {
                        res.status(StatusCodes.OK).json({
                            'msg': 'Arbol modificado correctamente',
                            'status': 'OK'
                        })
                    } else {
                        res.status(StatusCodes.NOT_FOUND).json({
                            'msg': 'Arbol no ha sido encontrado',
                            'status': 'ERROR'
                        })
                    }
        
                }else {
                    console.log('es nulo');
                    const nombre = await subirArchivo(req.files, undefined, process.env.UPLOADS_DIR_TREE)
                    const ruta = `${nombre}`
        
                    const arbol = {
                        ...req.body,
                        foto: ruta
                    }
                    const resultado = await Conexion.updateArbol(req.params.id, arbol)
                    if (resultado === 1) {
                        res.status(StatusCodes.OK).json({
                            'msg': 'Arbol modificado correctamente',
                            'status': 'OK'
                        })
                    } else {
                        res.status(StatusCodes.NOT_FOUND).json({
                            'msg': 'Arbol no ha sido encontrado',
                            'status': 'ERROR'
                        })
                    }
                }
            }
    
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                'msg': 'Error en el servidor',
                'status': 'ERROR'
            })
            
        }
        
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

/**
 * @author @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */
const arbolesGet = async (req = request, res = response) => {
    try{

        const arboles = await Conexion.getArboles()
        
        for(let i = 0; i < arboles.length; i++){
            if(arboles[i].foto != null){
                arboles[i].foto = process.env.URL_PETICION + process.env.PORT + "/api/arbol/galeria/" + arboles[i].foto
            }else {
                arboles[i].foto = null
            }

        }

        const response = {
            success: true,
            msg : {
                arboles
            }
        }
        res.status(StatusCodes.OK).json(response)

    }catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            'msg': 'Error en el servidor',
            'status': 'ERROR',
        })
    }
}

/**
 * @author @Ismael
 * @param {*} req 
 * @param {*} res 
 */

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
/**
 * @author @Ismael
 * @param {*} req 
 * @param {*} res 
 */

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

const getTopCiudadesArbol = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let ubicaciones = await Conexion.getTopUbicacionesArbol(id)
        ubicaciones = ubicaciones[0]
        const response = {
            success: true,
            ciudades: {
                ubicaciones
            }
        }

        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            'msg': 'Error en el servidor',
            'status': 'ERROR'
        })
    }

}

const getRuta = async (req = request, res = response) => {
    try {
        const radio = req.body.radio
        const latitud = req.body.latitud
        const longitud = req.body.longitud
        const ubicacionesDentro = []
        const ubicaciones = await Conexion.getUbicaciones()

        for(let i = 0; i < ubicaciones.length; i++){
            const lat = ubicaciones[i].dataValues.latitud
            const long = ubicaciones[i].dataValues.longitud
            const distancia = calcularDistaciaEntreDosPuntos(latitud, longitud, lat, long) 
            if (distancia <= radio) {
                ubicacionesDentro.push(ubicaciones[i])
            }
        }

        res.status(StatusCodes.OK).json({
            'msg': 'Ubicaciones encontradas',
            'ubicaciones': ubicacionesDentro
        })

    }catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            'msg': 'Error en el servidor',
            'status': 'ERROR'
        })
    }
}

const calcularDistaciaEntreDosPuntos = (lat1, lon1, lat2, lon2) => {
    let theta = lon1 - lon2
    let distancia = 60 * 1.1515 * (180/Math.PI) * Math.acos(Math.sin(lat1 *( Math.PI/180))
    * Math.sin(lat2 * (Math.PI/180)) + Math.cos(lat1 * (Math.PI/180)) * 
    Math.cos(lat2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180)))

    return Math.round(distancia * 1.609344, 2)

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
    cargarImagenArbol,
    getTopCiudadesArbol,
    getRuta
    
}