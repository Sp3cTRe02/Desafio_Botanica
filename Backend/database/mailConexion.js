const nodemailer = require('nodemailer');

/**
 * @author @Ismael
 */

class UsuarioManager {
    static async getUsuarioPorEmail(email) {
        let resultado = null;

        try {
            resultado = await models.Usuario.findOne({
                where: { email: email }
            });
    
            if (!resultado) {
                console.log("Usuario no encontrado");
                resultado = null;
            }
    
        } catch (error) {
            console.error("Error al buscar usuario por email:", error);
            throw error;
        }
    
        return resultado;
    }
    
    static async actualizarContraseña(email) {
        const caracteres = 'A-Za-z0-9';
        let contraseñaNueva = Array.from({length: 10}, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');

        try {
            const contraseñaHash = await bcrypt.hash(contraseñaNueva, 10);
            await models.Usuario.update({ passwd: contraseñaHash }, { where: { email: email } });
            console.log("Contraseña actualizada correctamente");
            return contraseñaNueva;
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
            throw error;
        }
    }

    }



  
module.exports = transporter