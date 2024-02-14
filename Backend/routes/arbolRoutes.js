const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/arbolController')

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
]

router.get('/', controlador.arbolGet)
router.get('/',controlador.arbolesGet)
router.post('/', validator, controlador.arbolPost)
router.put('/:id', validator, controlador.arbolPut)
router.delete('/:id', controlador.arbolDelete)

module.exports = router