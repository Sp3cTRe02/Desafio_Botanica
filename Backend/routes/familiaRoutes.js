const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const controlador = require('../controllers/familiaController')
const midAdmin = require('../middlewares/validarAdmin')
const midsJWT = require("../middlewares/validarJWT");

const validator = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
]

/**
 * @Jaime_Rafael
 */
// [midsJWT.validarJWT,midAdmin.verificarAdmin],
router.get('/',  controlador.familiaGet)
router.get('/familia-admin',controlador.familiaAdmin)
router.post('/', [midsJWT.validarJWT, midAdmin.verificarAdmin, validator], controlador.familiaPost)
router.put('/:id',  [midsJWT.validarJWT, midAdmin.verificarAdmin, validator], controlador.familiaPut)
router.delete('/:id', [midsJWT.validarJWT,midAdmin.verificarAdmin], controlador.familiaDelete)

module.exports = router