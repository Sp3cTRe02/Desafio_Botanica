const { StatusCodes } = require('http-status-codes')
const arbolesConexion = require('../database/arbolesConexion')


class arbolesController{
    static getArbolesGeneral = async(req,res) =>{
        try{
            const arboles = await arbolesConexion.getArbolesGeneral()

            const response = {
                sucess:true,
                data:{
                    arboles: arboles
                }
            }

            res.status(StatusCodes.OK).json(response)
        }catch(error){
            const response = {
                success: false,
                data: null,
                msg: 'Error en el servidor.'
            }

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
        }
    }
}


module.exports = arbolesController