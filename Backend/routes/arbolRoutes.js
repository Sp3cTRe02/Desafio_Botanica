const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/arbolController')
const midAdmin = require('../middlewares/validarAdmin')
const midsJWT = require("../middlewares/validarJWT");
const midCliente = require('../middlewares/validarCliente')

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
]

const validatorUbicacion = [
    check('latitud', 'La latitud es obligatoria').not().isEmpty(),
    check('longitud', 'La longitud es obligatoria').not().isEmpty(),
    check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
    validarCampos
]

// router.get('/:id', controlador.arbolGet)
router.get('/', [midsJWT.validarJWT, midAdmin.verificarAdmin] ,controlador.arbolesGet)
router.post('/', [midsJWT.validarJWT, midAdmin.verificarAdmin, validator], controlador.arbolPost)
router.put('/:id', [midsJWT.validarJWT, midAdmin.verificarAdmin, validator], controlador.arbolPut)
router.delete('/:id', [midsJWT.validarJWT, midAdmin.verificarAdmin], controlador.arbolDelete)

// rutas para pantalla de arbol(añadir ubicaciones e imagenes)
router.post('/ubicacion/:id', [midsJWT.validarJWT, midCliente.verificarCliente, validatorUbicacion], controlador.addUbicacion)
router.post('/imagen/:id', [midsJWT.validarJWT, midCliente.verificarCliente], controlador.subirImagen)


module.exports = router