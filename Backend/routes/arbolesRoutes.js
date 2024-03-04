const { Router } = require('express')
const router = Router()
const arboles = require ('../controllers/arbolesController')

/**
 * @David_Trujillo
 */


router.get('/lista-arboles', arboles.getArbolesGeneral)
router.get('/:id',arboles.getInformacionArbol)
router.get('/ubi/:id',arboles.getUbicacionesArbol)
router.get('/fotos/:id',arboles.getFotosArbol)


module.exports = router