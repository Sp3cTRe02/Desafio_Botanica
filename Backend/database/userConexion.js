const db = require('../database/Conexion.js');
const { Sequelize } = require('sequelize');
const models = require('../models/index.js'); 
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const bd = new db()


/**
 * @Jaime_Rafael
 * @param {*} body 
 * @returns 
 */
const createUsuario = async (body) => {
    let resultado = 0 
    bd.conectar()

    let pass = await bcrypt.hash(body.passwd, 10)
    body.passwd = pass
    console.log("hola desde userConexion");
    try{
         const nuevoUsuario = await models.Usuario.create(body)
         const idRol = await models.sequelize.query('SELECT id FROM roles WHERE nombre = "cliente" ', { type: QueryTypes.SELECT });
         await models.sequelize.query('INSERT INTO rolusuario (idRol, idUsuario) VALUES ('+idRol[0].id+', '+nuevoUsuario.id+')', { type: QueryTypes.INSERT });
         resultado = 1
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('El usuario no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado
}

/**
 * @author @Jaime_Rafael
 * @returns 
 */
const updateUsuario = async (body, id) => {
    let resultado = 0 
    bd.conectar()
    try{
        let passwd = await bcrypt.hash(body.passwd, 10)
        body.passwd = passwd
        const usuario = await models.Usuario.update(body, 
            {where: 
                {id: id}
            }
        )
        resultado = 1
    }catch (error){
        if (error instanceof Sequelize.ValidationError) {
            console.log('El usuario no cumple los requisitos')
        }else{
            console.log('Error desconocido')
        }
        throw error
    }finally{
        bd.desconectar()
    }
    return resultado
}

const getUsuarios = async () => {
    bd.conectar()
    try {
        const usuarios = await models.Usuario.findAll()
        return usuarios
    } catch (error) {
        console.log('Error al obtener usuarios de la base de datos')
        throw error
    } finally {
        bd.desconectar()
    }
}

const deleteUsuarios = async (id) => {
    bd.conectar()
    try {
        const resultado = await models.Usuario.update(
            { Desactivado: 1 },
            { where: { id: id } }
        )
        return resultado
    } catch (error) {
        console.log('Error al eliminar usuario')
        throw error
    } finally {
        bd.desconectar()
    }
}



module.exports = {
    createUsuario,
    updateUsuario,
    getUsuarios,
    deleteUsuarios
}