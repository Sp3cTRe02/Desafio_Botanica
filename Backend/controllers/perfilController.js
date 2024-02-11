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

const updateUsuarioPorId = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const usuario = await Conexion.actualizarUsuarioPorId(id, body);

    if (usuario === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Usuario no encontrado' });
    } else {
      return res.status(StatusCodes.OK).json({ message: 'Usuario actualizado con éxito' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor' });
  }
};





module.exports = {
 getUsuarioPorId,
 updateUsuarioPorId
}