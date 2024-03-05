const { Router } = require('express')
const router = Router()
const auth = require('../controllers/authController')
const { check, body } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const existeCorreo = require('../middlewares/existeCorreo')


/**
 * @David_Trujillo
 */

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre solo puede contener letras').isAlpha('es-ES', {ignore: ' '}),
    check('ap1', 'El primer apellido es obligatorio').not().isEmpty(),
    check('ap1', 'El primer apellido solo puede contener letras').isAlpha('es-ES', {ignore: ' '}),
    check('ap2', 'El segundo apellido es obligatorio').not().isEmpty(),
    check('ap2', 'El segundo apellido solo puede contener letras').isAlpha('es-ES', {ignore: ' '}),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check('email', 'El email no es válido').isEmail(),
    check('passwd', 'La contraseña es obligatoria').not().isEmpty(),
    body('email').custom(existeCorreo),
    validarCampos
];

router.post('/login', auth.login);
router.post('/registrar', validator, auth.registrar);




module.exports = router