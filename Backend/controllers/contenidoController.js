const contenidoConexion = require('../database/contenidoConexion')
const { StatusCodes } = require('http-status-codes')
const socketController = require('../controllers/websocketController')

class contenidoController {
    static crearContenido = async (req, res) => {
        try {
            await contenidoConexion.crearContenido(req.body)
            socketController()
        

            res.status(StatusCodes.CREATED).json({
                success: true,
                data: {
                    msg: 'Contenido registrado correctamente',
                }
            });

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al registrar contenido.', 'sqlMessage': error })
        }
    }
}

module.exports = contenidoController