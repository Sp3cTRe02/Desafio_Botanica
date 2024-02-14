const db = require('../database/Conexion.js');
const { Sequelize } = require('sequelize');
const models = require('../models/index.js'); 
const { QueryTypes } = require('sequelize');

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

const updateArbol = async (body, id) => {
    let resultado = 0 
    bd.conectar()
    try{
        const familia = await models.Familia.update(body, 
            {where: 
                {id: id}
            }
        )
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
    bd.conectar()
    const arboles = await models.Arbol.findAll()
    bd.desconectar()
    return arboles
}

const deleteArboles = async (id) => {
    let resultado = 0 
    bd.conectar()
    try{
        const familia = await models.Arbol.destroy(
            {where: 
                {id: id}
            }
        )
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

module.exports = {
  
    createArbol,
    updateArbol,
    getArbol,
    getArboles,
    deleteArboles
}
