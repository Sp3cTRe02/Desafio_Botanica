const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/userController')
const controladorPerfil = require('../controllers/perfilController')
const midAdmin = require('../middlewares/validarAdmin')
const midsJWT = require("../middlewares/validarJWT");


const { validarArchivoSubir } = require('../middlewares/validarArchivo')

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
router.post('/usuario', [midsJWT.validarJWT,midAdmin.verificarAdmin,validator], controlador.usuarioPost)
router.get('/usuario', [midsJWT.validarJWT,midAdmin.verificarAdmin], controlador.usuarioGet)
router.delete('/usuario/:id', [midsJWT.validarJWT,midAdmin.verificarAdmin] ,controlador.usuarioDelete)
router.put('/usuario/:id', controlador.usuarioPut)

// RUTAS MODIFICAR ROL CLIENTE (token)
router.put('/addRol', [midsJWT.validarJWT,midAdmin.verificarAdmin,validatorRol], controlador.addRol)
router.put('/deleteRol', [midsJWT.validarJWT,midAdmin.verificarAdmin,validatorRol], controlador.removeRol)


// RUTA PARA SUBIR IMAGEN (token)
router.post('/subirImagen/', [midsJWT.validarJWT,validarArchivoSubir], controlador.subirImagenUsuario)

//RUTAS ACCEDER AL PERFIL
router.get('/perfil/:id', midsJWT.validarJWT,controladorPerfil.getUsuarioPorId); 
router.post('/perfil/:id',midsJWT.validarJWT, controladorPerfil.updateUsuarioPorId);

module.exports = router