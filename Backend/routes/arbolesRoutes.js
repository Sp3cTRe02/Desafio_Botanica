const { Router } = require('express')
const router = Router()
const arboles = require ('../controllers/arbolesController')

router.get('/lista-arboles', arboles.getArbolesGeneral)

module.exports = router