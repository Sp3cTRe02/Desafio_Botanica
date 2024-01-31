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

module.exports = {
    createUsuario
}