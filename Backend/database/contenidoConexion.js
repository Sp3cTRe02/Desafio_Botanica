const models = require('../models/index.js')
const { Sequelize } = require('sequelize')


class contenidoConexion {
    static crearContenido = async (body) => {
        let resultado = 0

        try {
            await models.Contenido.create(body)
        } catch (error) {
            throw error
        }

        return resultado
    }
}


module.exports = contenidoConexion