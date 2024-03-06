const models = require('../models/index.js')
const { Sequelize } = require('sequelize')

/**
 * @David_Trujillo
 * @Jaime_Rafael para getArbolesGeneral(para las fotos)
 */

class ArbolesConexion{
    static getArbolesGeneral = async () => {
        try {
            const resultado = await models.sequelize.query(
                `SELECT arb.id, arb.nombre, arb.ep_floracion, arb.foto ,fam.nombre AS nombre_fam 
                FROM arboles arb 
                JOIN familias fam ON arb.id_familia = fam.id
                WHERE arb.desactivado = 0
                ORDER BY arb.id`,
                { type: Sequelize.QueryTypes.SELECT }
            );
    
            return resultado
        } catch (error) {
            console.error("Error al buscar arboles:", error)
            throw error
        }
    }

    static getInformacionArbol = async (idArbol) =>{
        try{
            const resultado = await models.sequelize.query(
                `SELECT arb.id, arb.nombre, arb.ep_floracion, arb.descripcion, arb.foto, fam.nombre AS nombreFam 
                FROM arboles arb 
                JOIN familias fam ON arb.id_familia = fam.id
                WHERE arb.id = ${idArbol}`,
                { type: Sequelize.QueryTypes.SELECT }
            )
            return resultado
        }catch(error){
            throw error
        }
    }

    static getUbicacionesArbol = async (id_arbol) =>{
        try{
            const resultado = await models.Ubicacion.findAll({
                where:{
                    id_arbol:id_arbol
                }
            })
            return resultado
        }catch(error){
            throw error
        }
    }

    static getFotosArbol = async (idArbol) =>{
        try{
            const resultado = await models.Foto.findAll({
                where:{
                    idArbol:idArbol
                }
            })
            return resultado
        }catch(error){
            throw error
        }
    }
    
}


module.exports = ArbolesConexion