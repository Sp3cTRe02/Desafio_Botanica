const db = require('../database/Conexion.js');
const { Sequelize } = require('sequelize');
const models = require('../models/index.js'); 
const { QueryTypes } = require('sequelize');

const bd = new db()

/**
 * @author @Jaime_Rafael
 */


const createFamilia = async (body) => {
    let resultado = 0 
    bd.conectar()
    try{
        const nuevaFamilia = await models.Familia.create(body)
        resultado = 1
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('La familia no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado
}

const updateFamilia = async (body, id) => {
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
            console.log('La familia no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado
}


const getFamilias = async () => {
    bd.conectar()
    const familias = await models.Familia.findAll({
        attributes: ['nombre'],
        include: [{
            model: models.Arbol,
            as: 'FamiliaArbol',
            attributes: ['nombre', 'epFloracion', 'descripcion'],
            required: false
        }]
    })
    bd.desconectar()
    return familias
}

const getFamiliasAdmin = async () =>{
    bd.conectar()
    const familias = await models.Familia.findAll()
    bd.desconectar()
    return familias
}

const deleteFamilias = async (id) => {
    let resultado = 0 
    bd.conectar()
    try{
        const familia = await models.Familia.destroy(
            {where: 
                {id: id}
            }
        )
        resultado = 1
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('La familia no cumple los requisitos')
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
    createFamilia,
    updateFamilia,
    getFamilias,
    getFamiliasAdmin,
    deleteFamilias
}
