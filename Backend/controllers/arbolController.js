const { response, request } = require('express')
const Conexion = require('../database/arbolConexion')
const { StatusCodes } = require('http-status-codes')
const {subirArchivo} = require('../helpers/subir-archivo')
const fs = require('fs')
require('dotenv').config()

/**
 * @author @Ismael
 */

const arbolPost = async (req = request, res = response) => {
    Conexion.createArbol(req.body)
        .then(msg => {
            console.log('Arbol creada correctamente');
            res.status(StatusCodes.CREATED).json({
                'msg': 'Arbol creado correctamente',
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
        const ruta = `${process.env.UPLOADS_PATH}/${process.env.UPLOADS_DIR_TREE}/${nombre}`
    
        const cod = await Conexion.subirImagenArbol(req.params.id, ruta)
    
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

module.exports = {

    arbolPost,
    arbolPut,
    arbolesGet,
    arbolGet,
    arbolDelete,
    addUbicacion,
    subirImagen
    
}