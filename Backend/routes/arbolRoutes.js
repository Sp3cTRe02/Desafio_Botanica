const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/arbolController')
const midAdmin = require('../middlewares/validarAdmin')
const midsJWT = require("../middlewares/validarJWT");

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
]

// router.get('/:id', controlador.arbolGet)
router.get('/', [midsJWT.validarJWT, midAdmin.verificarAdmin] ,controlador.arbolesGet)
router.post('/', [midsJWT.validarJWT, midAdmin.verificarAdmin, validator], controlador.arbolPost)
router.put('/:id', [midsJWT.validarJWT, midAdmin.verificarAdmin, validator], controlador.arbolPut)
router.delete('/:id', [midsJWT.validarJWT, midAdmin.verificarAdmin], controlador.arbolDelete)

module.exports = router