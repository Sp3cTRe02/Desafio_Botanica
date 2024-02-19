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

/**
 * @author @Jaime_Rafael
 * @param {*} idUsuario 
 * @param {*} idRol 
 * @returns 
 */
const addRol = async (idUsuario, idRol) => {
    let resultado = 0
    bd.conectar()
    console.log('añade rol');
    try{
        let hasRol = await models.RolUsuario.findOne({
            where: {
                idUsuario: idUsuario,
                idRol: idRol
            }
        })
        if(!hasRol){
            const rolUsuario = await models.RolUsuario.create({
                idUsuario: idUsuario,
                idRol: idRol
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
                idUsuario: idUsuario,
                idRol: idRol
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