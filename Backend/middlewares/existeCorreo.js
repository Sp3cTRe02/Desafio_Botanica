/**
 * @David_Trujillo
 */

const models = require('../models/index.js')

const existeCorreo = async (value) => {
    if (!value) {
        throw new Error('El email es obligatorio');
    }

    const user = await models.Usuario.findOne({ where: { 'email': value } });
    if (user) {
        throw new Error('Este email ya está registrado');
    }
};
    

module.exports = existeCorreo