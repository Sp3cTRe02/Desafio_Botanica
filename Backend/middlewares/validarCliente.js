const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

/**
 * @Jaime_Rafael
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const verificarCliente = (req, res, next) => {
    const token = req.header('x-token')

    try {
        const payload = jwt.decode(token, { complete: true })
        const roles = payload.payload.roles

        const rolBuscado = "cliente"
        const rol = roles.find(rol => rol.nombre === rolBuscado)

        if (!rol) {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Acceso denegado. Rol no autorizado.' })
        }


        next();
    } catch (error) {
        console.error('Error al validar el token:', error);
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Token no válido.' });
    }
};

module.exports = { verificarCliente };
