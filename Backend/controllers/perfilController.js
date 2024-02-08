const { response, request } = require('express')
const Conexion = require('../database/perfilConexion')
const { StatusCodes } = require('http-status-codes')

/**
 * @author @Ismael
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarioPorId = async (req = request, res= response) => {
  try {
    const { id } = req.params;
    const usuario = await Conexion.obtenerUsuarioPorId(id);
    if (!usuario) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Usuario no encontrado' });
    }
    return res.status(StatusCodes.OK).json(usuario);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor' });
  }
};
module.exports = {
 getUsuarioPorId
}