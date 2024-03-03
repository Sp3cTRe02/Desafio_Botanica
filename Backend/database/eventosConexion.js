const { QueryTypes } = require('sequelize')
const models = require('../models/index.js')

class eventosConexion {
    static crearEvento = async (body) => {
        let resultado = 0

        try {
            await models.Evento.create(body)
            resultado = 1
        } catch (error) {
            throw error
        }

        return resultado
    }

    static getEventos = async () => {
        let resultado = null

        try {
            resultado = await models.Evento.findAll({
                order: [['id', 'DESC']]
            })
        } catch (error) {
            throw error
        }

        return resultado
    }

    static getInfoEvento = async (idEvento) => {
        try {
            const resultado = await models.Evento.findByPk(idEvento)
            return resultado
        } catch (error) {
            throw error
        }
    }

    static getOrganizador = async (idEvento) => {
        try {
            const resultado = await models.sequelize.query(`
            SELECT nombre,ap1,ap2 FROM usuarios usu
            JOIN organizadoreventos oe
                ON usu.id = oe.idUsuario
            WHERE oe.idEvento = ${idEvento}`, { type: QueryTypes.SELECT })
            return resultado
        } catch (error) {
            throw error
        }
    }

    static getPlazasOcupadas = async (idEvento) => {
        try {

            const count = await models.ParticipaEvento.count({
                where: { idEvento: idEvento }
            })

            return count

        } catch (error) {
            throw error
        }
    }

    static getTotalPlazas = async (idEvento) => {
        try {
            const total = await models.Evento.findOne({
                where: { id: idEvento },
                attributes: ['cantidadMax']
            })

            return total
        } catch (error) {
            throw error
        }
    }

    static getImagen = async (id) => {
        let urlFoto = 0
        try {
            urlFoto = await models.Evento.findOne({
                where: {
                    id: id
                },
                attributes: ['imagen']
            })
        } catch (error) {
            console.log('Error al obtener la foto')
            throw error
        }

        return urlFoto
    }

    static getMisEventos = async (idUsuario) => {
        let resultado = null

        try {
            resultado = await models.sequelize.query(`
            SELECT ev.id,ev.nombre,ev.descripcion,ev.imagen,ev.ubicacion FROM eventos ev 
            JOIN organizadoreventos oe
                ON ev.id = oe.idEvento
            WHERE oe.idUsuario = ${idUsuario}`, { type: QueryTypes.SELECT }

            )
        } catch (error) {
            throw error
        }

        return resultado
    }

    static modificarEvento = async (idEvento,body) =>{
        let resultado = 0
        try {
            
            const evento = await models.Evento.findByPk(idEvento)

            if (!evento) {
                resultado = 0
            } else {
                await evento.update(body)
                resultado = 1
            }

        } catch (error) {
            resultado = 0
            console.error('Error al modificar contenido:', error)
        }
        return resultado;
    }

}

module.exports = eventosConexion