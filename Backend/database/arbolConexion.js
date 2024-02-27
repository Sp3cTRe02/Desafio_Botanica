const db = require('../database/Conexion.js');
const { Sequelize } = require('sequelize');
const models = require('../models/index.js'); 
const { QueryTypes } = require('sequelize');
const { th } = require('@faker-js/faker');

const bd = new db()

/**
 * @author @Ismael
 */

const createArbol = async (body) => {
    let resultado = 0 
    bd.conectar()
    try{
        const nuevoArbol = await models.Arbol.create(body)
        resultado = 1
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('El no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado
}

const updateArbol = async (id, body) => {
    let resultado = 0 
    bd.conectar()
    try{
        const arbol = await models.Arbol.update(body, 
            {where: 
                {id: id}
            }
        )
        console.log(id);
        resultado = 1
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('El arbol no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado
}


const getArbol = async (id) => {
    bd.conectar()
    const arbol = await models.Arbol.findOne({
        where: { id: id },
        attributes: ['nombre', 'epFloracion', 'descripcion']
    })
    bd.desconectar()
    return arbol
}

const getArboles = async () =>{
    let arboles = []
    try{
        arboles = await models.Arbol.findAll()
    }catch (error){
        console.log('Error al obtener arboles')
        throw error
    }
    return arboles
}

const deleteArboles = async (id) => {
    let arbol = 0 
    bd.conectar()
    try{
         arbol = await models.Arbol.update(
            { desactivado: 1 }, 
            { where: { id: id } }
        )
        
    }catch (error){
        console.log('Error al eliminar arbol')
        throw error
    }finally{
        bd.desconectar()
    }
    return arbol[0]
}

const addUbicacionArbol = async  (ubicacion, idArbol) => {
    let resultado = 0 
    bd.conectar()
    try{
        const nuevaUbicacion = await models.Ubicacion.create({
            latitud: ubicacion.latitud,
            longitud: ubicacion.longitud,
            ciudad: ubicacion.ciudad,
            idArbol: idArbol
        })
        resultado = 1
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('La ubicacion no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado
}

const subirImagenArbol = async (idArbol, ruta) => {
    let resultado = 0 
    bd.conectar()
    try{
        console.log(idArbol);
        const arbol = await models.Arbol.findOne({
            where: { id: idArbol }
        })
        if (!arbol){
            console.log('El arbol no existe')
            throw new Error('El arbol no existe')
        }
        const nuevaImagen = await models.Foto.create({
            ruta: ruta,
            idArbol: idArbol
        })
        resultado = 1
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('La imagen no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado

}

const getRutaImagenes = async (idArbol) => {
    let resultado = 0 
    bd.conectar()
    try{
        const imagenes = await models.Foto.findAll({
            where: { idArbol: idArbol }
        })
        resultado = imagenes
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('La imagen no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado
}

const getFoto = async (id) => {
    let urlFoto = 0
    bd.conectar()
    try {
        urlFoto = await models.Foto.findOne({
            where: {
                id: id
            },
            attributes: ['ruta']
        })
    } catch (error) {
        console.log('Error al obtener la foto')
        throw error
    }finally{
        bd.desconectar()
    }

    return urlFoto
}



module.exports = {

    createArbol,
    updateArbol,
    getArbol,
    getArboles,
    deleteArboles,
    addUbicacionArbol,
    subirImagenArbol,
    getRutaImagenes,
    getFoto
}
