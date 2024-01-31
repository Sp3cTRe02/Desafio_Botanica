const { Router } = require('express')
const router = Router()
const { StatusCodes } = require('http-status-codes')
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/userController')

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ap1', 'El primer apellido es obligatorio').not().isEmpty(),
    check('ap2', 'El segundo apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check('email', 'El email no es válido').isEmail(),
    check('passwd', 'El password es obligatorio').not().isEmpty(),
    validarCampos
]

router.post('/' , validator, controlador.usuarioPost)


module.exports = router