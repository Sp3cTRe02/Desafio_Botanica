const { Router } = require('express')
const router = Router()
const contenido = require('../controllers/contenidoController')

router.post('/', contenido.crearContenido)


module.exports = router