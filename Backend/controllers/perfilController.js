const { response, request } = require('express')
const Conexion = require('../database/perfilConexion')
const { StatusCodes } = require('http-status-codes')

/**
 * @author @Ismael , @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarioPorId = async (req = request, res= response) => {
  try {
    
    const id = req.idToken
    let usuario = await Conexion.obtenerUsuarioPorId(id);
    
    if (!usuario) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Usuario no encontrado' });
    }else{
      const imagen = process.env.URL_PETICION + process.env.PORT + '/api/cliente/fotoPerfil/' + usuario.foto;
      usuario.foto =  imagen;
    }

    return res.status(StatusCodes.OK).json(usuario);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor' });
  }
};

const updateUsuarioPorId = async (req = request, res = response) => {
  try {
    const id = req.idToken;
    const { body } = req;
    const usuario = await Conexion.actualizarUsuarioPorId(id, body);

   
    if (usuario === 0) {
      const response = {
        success: false,
        data: null,
        message: 'Usuario no encontrado'
      }
      return res.status(StatusCodes.NOT_FOUND).json(response);
    } else {
      const response = {
        success: true,
        data: {
          usuario
        }
      }
      return res.status(StatusCodes.OK).json(response);
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