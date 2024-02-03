const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/familiaController')

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
]

router.get('/familia', controlador.familiaGet)
router.post('/familia', validator, controlador.familiaPost)
router.put('/familia/:id', controlador.familiaPut)
router.delete('/familia/:id', controlador.familiaDelete)

module.exports = router