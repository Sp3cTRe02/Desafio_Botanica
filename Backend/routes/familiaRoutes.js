const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/familiaController')

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
]

router.get('/', controlador.familiaGet)
router.post('/', validator, controlador.familiaPost)
router.put('/:id', validator, controlador.familiaPut)
router.delete('/:id', controlador.familiaDelete)

module.exports = router