const { Router } = require('express')
const router = Router()
const rolControlador = require('../controllers/adminController')


router.get('/getRoles', rolControlador.consultarRoles)
router.get('/getRolesUsuario/:id', rolControlador.getRolesUsuario)

module.exports = router