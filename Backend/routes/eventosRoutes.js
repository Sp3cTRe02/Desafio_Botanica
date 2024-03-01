const { Router } = require('express')
const router = Router()
const evento = require('../controllers/eventosController')

router.get('/',evento.getEventos)
router.get('/:id', evento.getInfoEvento)
router.get('/upload/:id',evento.mostrarImagen)
router.get('/organizador/:id',evento.getOrganizador)
router.get('/plazas/:id',evento.getPlazasRestantes)
router.post('/participar',)
router.get('/pdf/descargar-pdf',evento.descargarPDF)

module.exports = router