/**
 * @author @Ismael
 */
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

    type: 'OAuth2',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
    accessToken: process.env.MAIL_ACCESS_TOKEN
    }
});

let mailOptions = {
    from: process.env.MAIL_USER,
    to: 'ismael22012004@gmail.com', //parametrizar con llamada a la base de datos con al gmail introducido y buscar su contraseña para mandarla
    subject: 'Nueva contraseña',
    text: 'Esto es una prueba de Nodemailer', //contraseña nueva generada automaticamente y cambiada en la base de datos
}

const enviarCorreo = (req, res) => {
    
    transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
    console.log ( 'Error al enviar el correo electronico:', error);
    res.status(203).json({'msg' : 'Correo NO enviado'})
    } else {
        console.log ( 'correo electronico enviado correctamente:', info.response);
    res.status(200).json({'msg' : 'Correo enviado'})
    }

    });
}
module.exports ={
enviarCorreo,

}