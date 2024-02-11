const models = require('../models/index.js')
const { Sequelize } = require('sequelize')

class ArbolesConexion{
    static getArbolesGeneral = async () => {
        try {
            const resultado = await models.sequelize.query(
                `SELECT arb.id, arb.nombre, arb.epFloracion, fam.nombre AS nombreFam 
                FROM arboles arb 
                JOIN familias fam ON arb.idFamilia = fam.id`,
                { type: Sequelize.QueryTypes.SELECT }
            );
    
            return resultado
        } catch (error) {
            console.error("Error al buscar arboles:", error)
            throw error
        }
    }

    static getInformacionArbol = async () =>{
        try{
            
        }catch(error){

        }
    }
    
}


module.exports = ArbolesConexion