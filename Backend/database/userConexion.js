const db = require('../database/Conexion.js');
const { Sequelize } = require('sequelize');
const models = require('../models/index.js'); 
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const bd = new db()

/**
 * Controlador hecho por @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */

const createUsuario = async (body) => {
    let resultado = 0 
    bd.conectar()

    let pass = await bcrypt.hash(body.passwd, 10)
    body.passwd = pass
    try{
         const nuevoUsuario = await models.Usuario.create(body)
         const idRol = await models.sequelize.query('SELECT id FROM roles WHERE nombre = "cliente" ', { type: QueryTypes.SELECT });
         await models.sequelize.query('INSERT INTO rol_usuario (id_rol, id_usuario) VALUES ('+idRol[0].id+', '+nuevoUsuario.id+')', { type: QueryTypes.INSERT });
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
        const usuario = await models.sequelize.query(
            `update usuarios set nombre = ?, ap1 = ?, ap2 = ?, email = ? where id = ?`,
            {
                replacements: [body.nombre, body.ap1, body.ap2, body.email, id],
                type: Sequelize.QueryTypes.UPDATE
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
/**
 * @Ismael
 * @returns 
 */
const getUsuarios = async () => {
    let usuarios = 0
    bd.conectar()
    try {
       
        usuarios = await models.Usuario.findAll();
        
    } catch (error) {
        console.log('Error al obtener usuarios de la base de datos')
        throw error
    } finally {
        bd.desconectar()
    }
    return usuarios
}
/**
 * @Ismael
 * @param {*} id 
 * @returns 
 */
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
/**
 * @Ismael
 * @param {*} id 
 * @returns 
 */
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

/**
 * @author @Jaime_Rafael
 * @param {*} idUsuario 
 * @param {*} idRol 
 * @returns 
 */
const addRol = async (idUsuario, idRol) => {
    let resultado = 0
    bd.conectar()
    try{
        let hasRol = await models.RolUsuario.findOne({
            where: {
                id_usuario: idUsuario,
                id_rol: idRol
            }
        })
        if(!hasRol){
            const rolUsuario = await models.RolUsuario.create({
                id_usuario: idUsuario,
                id_rol: idRol
            })
            resultado = 1
        }else{
            console.log('El usuario ya tiene el rol')
            resultado = 2
        }
    }catch (error){
        console.log(error);
        throw error
    }
    return resultado
}

/**
 * @author @Jaime_Rafael
 * @param {*} idUsuario 
 * @param {*} idRol 
 */
const removeRol = async (idUsuario, idRol) => {
    let resultado = 0
    bd.conectar()
    try {
        const rolUsuario = await models.RolUsuario.destroy({
            where: {
                id_usuario: idUsuario,
                id_rol: idRol
            }
        })
        resultado = 1
    } catch (error) {
        console.log(error);
        throw error
    }
    return resultado
}

const subirImagenUsuario = async (ruta, id) => {
    let resultado = 0
    bd.conectar()
    try {
        const usuario = await models.Usuario.update(
            { foto: ruta },
            { where: { id: id } }
        )
        if (usuario[0] === 1) {
            resultado = 1
        }
    } catch (error) {
        console.log('Error al subir imagen')
        throw error
    } finally {
        bd.desconectar()
    }
    return resultado

}

const getFoto = async(id) => {
    let urlFoto = 0
    bd.conectar()
    try {
        urlFoto = await models.Usuario.findOne({
            where: {
                id: id
            },
            attributes: ['foto']
        })
    } catch (error) {
        console.log('Error al obtener la foto')
        throw error
    } finally {
        bd.desconectar()
    }
    return urlFoto
}


module.exports = {

    createUsuario,getUsuarios,deleteUsuarios,/*getActivado*/updateUsuario,
    addRol,removeRol, subirImagenUsuario, getFoto
    
}