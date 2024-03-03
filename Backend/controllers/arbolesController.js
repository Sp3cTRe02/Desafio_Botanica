const { StatusCodes } = require('http-status-codes')
const arbolesConexion = require('../database/arbolesConexion')
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');

/**
 * @David_Trujillo
 * @Jaime_Rafael para getArbolesGeneral(para las fotos)
 */
class arbolesController {
    static getArbolesGeneral = async (req, res) => {
        try {
            const arboles = await arbolesConexion.getArbolesGeneral()

            for (let i = 0; i < arboles.length; i++) {
                if (arboles[i].foto != null) {
                    arboles[i].foto = process.env.URL_PETICION + process.env.PORT + "/api/arbol/galeria/" + arboles[i].foto
                }else {
                    arboles[i].foto = null
                }
            }
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
            if(contenido[0].foto != null){
                contenido[0].foto = process.env.URL_PETICION + process.env.PORT + "/api/arbol/galeria/" + contenido[0].foto
            }else{
                contenido[0].foto = null
            }

            const response = {
                success: true,
                arbol: {
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