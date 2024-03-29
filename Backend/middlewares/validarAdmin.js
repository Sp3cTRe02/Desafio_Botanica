const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

/**
 * @David_Trujillo
 */

const verificarAdmin = (req, res, next) => {
    const token = req.header('x-token')

    try {
        const payload = jwt.decode(token, { complete: true })
        const roles = payload.payload.roles

        const rolBuscado = "admin"
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

module.exports = { verificarAdmin };
