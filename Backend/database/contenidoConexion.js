const models = require('../models/index.js')
const { Sequelize } = require('sequelize')

/**
 * @David_Trujillo
 */

class contenidoConexion {
    static crearContenido = async (body) => {
        let resultado = 0;
    
        try {
            await models.Contenido.create(body);
            resultado = 1;
        } catch (error) {
            throw error;
        }
    
        return resultado;
    }

    static getContenido = async () => {
        let resultado = null

        try {
            resultado = await models.Contenido.findAll({
                order: [['id', 'DESC']]
            })
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

    static getImagen = async (id) => {
        let urlFoto = 0

        try {
            urlFoto = await models.Contenido.findOne({
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

    static subirImagenNoticia = async (ruta,id) =>{
        let resultado = 0
        try {
            const noticia = await models.Contenido.update(
                {imagen:ruta},
                {where: {id:id}}
            )

            if (noticia[0] === 1) {
                resultado = 1
            }
        }catch(error){
            console.log('Error al subir imagen')
            throw error
        }
        return resultado
    }

    static getInfoInicio = async () =>{
        try {
            const resultado = await models.ContenidoAuxiliar.findByPk(1);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    static modificarContenidoInicio = async (idContenido, body) => {
        let resultado = 0
        try {
            const usuario = await models.ContenidoAuxiliar.findByPk(idContenido)

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
}


module.exports = contenidoConexion