
const { Router } = require('express');
const router = Router()
const { StatusCodes } = require('http-status-codes')
const mailController = require('../controllers/mailController')
const { mandarEmailRecuperacion } = require('../controllers/mailController');

router.get ('/', mailController.enviarCorreo)

router.post('/recuperarContraseña', async (req, res) => {
    const { email } = req.body;

    const contraseña = 'ContraseñaTemporal123'; 

    try {
        await sendRecoveryEmail(email, contraseña);
        res.status(200).send('Correo de recuperación enviado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al enviar el correo de recuperación');
    }
});

module. exports = router
