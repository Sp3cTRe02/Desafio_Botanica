const models = require('../models/index.js')
const { Sequelize, QueryTypes } = require('sequelize')
const bcrypt = require('bcrypt')

/**
 * @David_Trujillo
 */

class AuthConexion {
    static getUsuarioLogin = async (email, pass) => {
        let resultado = null

        try {
            resultado = await models.Usuario.findOne({
                where: { email: email, desactivado:false  },
                attributes: ['id', 'nombre', 'passwd']
            })
            

            if (resultado && (await bcrypt.compare(pass, resultado.passwd))) {
                console.log("Acceso permitido")
            } else {
                console.log("Usuario no encontrado o contraseña incorrecta")
                resultado = null
            }

        } catch (error) {
            console.error("Error al buscar usuario:", error)
            throw error
        }

        return resultado
    }


    static obtenerRoles = async (id) => {
        const resultado = await models.sequelize.query(`
            SELECT DISTINCT r.nombre FROM roles r
            JOIN rol_usuario ru   
                ON r.id=ru.id_rol
            WHERE ru.id_usuario = ${id}
        `, {type:QueryTypes.SELECT})
        return resultado;
    }

    static registrarUsuario = async (body) => {
        let resultado = 0

        try {
            const contrasenaHash = await bcrypt.hash(body.passwd, 10)
            await models.Usuario.create({
                ...body,
                passwd: contrasenaHash

            })
            resultado = 1
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El id ${body.id} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error
        }
        return resultado
    }

    static crearUsuarioRol = async (idRol, idUsu) => {
        let resultado = 0
        console.log(idRol)

        try {
            await models.RolUsuario.create({
                idRol: idRol,
                idUsuario: idUsu
            }
            )
            resultado = 1
        } catch (error) {
            console.error('Error al crear el usuario con rol:', error);
        }
        return resultado
    }

    static obtenerIdUltimoUsuario = async () => {
        try {
            const ultimoId = await models.Usuario.max('id', { where: {}, raw: true })
            return ultimoId || 0
        } catch (error) {
            console.error('Error al obtener el último ID de usuario:', error)
            throw error;
        }
    }


}

module.exports = AuthConexion