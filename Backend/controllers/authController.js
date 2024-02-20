const { generarJWT } = require('../helpers/generarJWT')
const { StatusCodes } = require('http-status-codes')
const authConexion = require('../database/authConexion')
const jwt = require('jsonwebtoken')


/**
 * @David_Trujillo
 * @param {*} body 
 * @returns 
 */
class authController {
    static login = async (req, res) => {
        const { email, passwd } = req.body;
        try {
            const usu = await authConexion.getUsuarioLogin(email, passwd);

            if (usu) {
                const roles = await this.obtenerRoles(usu.id);

                const token = generarJWT(usu.id, roles);

                const decodedPayload = jwt.decode(token, { complete: true });
                console.log('Decoded JWT payload:', decodedPayload.payload);

                const response = {
                    success: true,
                    data: {
                        id: usu.id,
                        nombre: usu.nombre,
                        token: token,
                        roles: roles
                    },
                    msg: 'Login exitoso.'
                };

                res.status(StatusCodes.OK).json(response);
            } else {
                console.log('No hay registro de ese usuario.');
                const response = {
                    success: false,
                    data: null,
                    msg: 'Login incorrecto.'
                };

                res.status(StatusCodes.BAD_REQUEST).json(response);
            }
        } catch (error) {
            console.log(error);
            const response = {
                success: false,
                data: null,
                msg: 'Error en el servidor.'
            };

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
        }
    }



    static obtenerRoles = async (idUsu) => {
        try {
            const roles = await authConexion.obtenerRoles(idUsu)
            return roles
        } catch (error) {
            throw error
        }
    }

    static registrar = async (req, res) => {
        try {
            await authConexion.registrarUsuario(req.body);

            const mensajeUsuarioRol = await this.crearUsuarioRol();


            res.status(StatusCodes.CREATED).json({
                success: true,
                data: {
                    msg: 'Usuario registrado correctamente',
                    mensajeUsuarioRol
                }
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'msg': 'Error en el servidor al registrar usuario.', 'sqlMessage': error })
        }
    }

    static crearUsuarioRol = async () => {
        try {
            const ultimoId = await authConexion.obtenerIdUltimoUsuario();
            await authConexion.crearUsuarioRol(2, ultimoId);

            return 'Usuario rol registrado correctamente';
        } catch (error) {
            throw error;
        }
    }



}

module.exports = authController