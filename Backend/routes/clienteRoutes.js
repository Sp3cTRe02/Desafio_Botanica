const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/userController')
const controladorPerfil = require('../controllers/perfilController')

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ap1', 'El primer apellido es obligatorio').not().isEmpty(),
    check('ap2', 'El segundo apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check('email', 'El email no es válido').isEmail(),
    check('passwd', 'El password es obligatorio').not().isEmpty(),
    validarCampos
]

const validatorRol = [
    check('idUsuario', 'El idUsuario es obligatorio').not().isEmpty(),
    check('idRol', 'El idRol es obligatorio').not().isEmpty(),
    validarCampos
]

// RUTAS CRUD CLIENTE
router.post('/usuario', validator, controlador.usuarioPost)
router.get('/usuario', controlador.usuarioGet)
router.delete('/usuario/:id', controlador.usuarioDelete)
router.put('/usuario/:id', controlador.usuarioPut)

// RUTAS MODIFICAR ROL CLIENTE
router.put('/addRol', validatorRol, controlador.addRol)
router.delete('/deleteRol', validatorRol, controlador.removeRol)

//RUTAS ACCEDER AL PERFIL
router.get('/perfil/:id', controladorPerfil.getUsuarioPorId); 

module.exports = router