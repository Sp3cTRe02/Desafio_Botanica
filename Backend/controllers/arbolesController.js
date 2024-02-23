const { StatusCodes } = require('http-status-codes')
const arbolesConexion = require('../database/arbolesConexion')

/**
 * @David_Trujillo
 */
class arbolesController {
    static getArbolesGeneral = async (req, res) => {
        try {
            const arboles = await arbolesConexion.getArbolesGeneral()

            const response = {
                sucess: true,
                data: {
                    arboles: arboles
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            const response = {
                success: false,
                data: null,
                msg: 'Error en el servidor.'
            }

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
        }
    }


    static getInformacionArbol = async (req, res) => {

        try {
            const id = req.params.id
            const contenido = await arbolesConexion.getInformacionArbol(id)

            const response = {
                success: true,
                data: {
                    contenido
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al obtener el contenido.', 'sqlMessage': error })
        }
    }

    static getUbicacionesArbol = async (req, res) => {
        try {
            const id = req.params.id
            const contenido = await arbolesConexion.getUbicacionesArbol(id)

            const response = {
                success: true,
                data: {
                    contenido
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al obtener el contenido.', 'sqlMessage': error })
        }
    }

    static getFotosArbol = async (req, res) => {
        try {
            const id = req.params.id
            const contenido = await arbolesConexion.getFotosArbol(id)

            const response = {
                success: true,
                data: {
                    contenido
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al obtener el contenido.', 'sqlMessage': error })
        }
    }

}


module.exports = arbolesController