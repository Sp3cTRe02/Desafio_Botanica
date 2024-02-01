const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')

const validarJWT = (req, res, next) => { 
    const token = req.header('x-token');

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ 'msg': 'No hay token en la petición.' });
    }

    try {

        const { uid, roles } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.idToken = uid;
        req.roles = roles
        next();

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.UNAUTHORIZED).json({ 'msg': 'Token no válido.' });
    }
}

module.exports = {
    validarJWT
}