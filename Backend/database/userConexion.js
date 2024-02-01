const db = require('../database/Conexion.js');
const { Sequelize } = require('sequelize');
const models = require('../models/index.js'); 
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const bd = new db()

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

const getUsuarios = async () => {
    let usuarios = 0
    bd.conectar()
    try {
        usuarios = await models.Usuario.findAll()
       
    } catch (error) {
        console.log('Error al obtener usuarios de la base de datos')
        throw error
    } finally {
        bd.desconectar()
    }
    return usuarios
}

const deleteUsuarios = async (id) => {
    let usuario=0
    bd.conectar()
    try {
         usuario = await models.Usuario.update(
            { desactivado: 1 },
            { where: { id: id } }
        )

    } catch (error) {
        console.log('Error al eliminar usuario')
        throw error
    } finally {
        bd.desconectar()
    }
    return usuario[0]
}

// const getActivado = async (id) => {
//     let usuario=0
//     bd.conectar()
//     try {
//         usuario = await models.Usuario.get(
//             { where: { id: id } },
//             {where: {desactivado: 1 }},
//         )
    
//     } catch (error) {
//     console.log('Error al eliminar usuario')
//     throw error
//     } finally {
//     bd.desconectar()
//     }
//     return usuario[0]
// }

module.exports = {
    createUsuario,getUsuarios,deleteUsuarios,/*getActivado*/
}