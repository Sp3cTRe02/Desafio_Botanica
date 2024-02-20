const models = require('../models/index.js')
const { Sequelize } = require('sequelize')


class contenidoConexion {
    static crearContenido = async (body) => {
        let resultado = 0

        try {
            await models.Contenido.create(body)
            resultado = 1
        } catch (error) {
            throw error
        }

        return resultado
    }

    static getContenido = async () => {
        let resultado = null

        try {
            resultado = await models.Contenido.findAll()
        } catch (error) {
            throw error
        }

        return resultado

    }

    static getUltimasNoticias = async () => {
        let resultado = null

        try {
            resultado = await models.Contenido.findAll({
                order: [['id', 'DESC']],
                limit: 4
            })
        } catch (error) {
            throw error
        }

        return resultado
    }

    static getInfoNoticia = async (idNoticia) => {
        try {
            const resultado = await models.Contenido.findByPk(idNoticia);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    


    static modificarContenido = async (idContenido, body) => {
        let resultado = 0
        try {
            const usuario = await models.Contenido.findByPk(idContenido)

            if (!usuario) {
                resultado = 0
            } else {
                await usuario.update(body)
                resultado = 1
            }

        } catch (error) {
            resultado = 0
            console.error('Error al modificar usuario:', error)
        }
    }

    static eliminarContenido = async (idContenido) => {
        let resultado = 0
        try {
            const usuario = await models.Contenido.findByPk(idContenido)

            if (!usuario) {
                resultado = 0
            } else {
                await usuario.destroy()
                resultado = 1
            }

        } catch (error) {
            resultado = 0
            console.error('Error al eliminar usuario:', error)
        }
    }
}


module.exports = contenidoConexion