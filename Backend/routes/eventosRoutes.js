const { Router } = require('express')
const router = Router()
const evento = require('../controllers/eventosController')
const midsJWT = require("../middlewares/validarJWT");

router.get('/',evento.getEventos)
router.get('/:id', evento.getInfoEvento)
router.get('/upload/:id',evento.mostrarImagen)
router.get('/organizador/:id',evento.getOrganizador)
router.get('/plazas/:id',evento.getPlazasRestantes)
router.get('/ev/mis-eventos',[midsJWT.validarJWT],evento.getMisEventos)
router.get('/pdf/descargar-pdf',evento.descargarPDF)
router.put('/:id', evento.modificarEvento)
router.post('/participar/:id', [midsJWT.validarJWT], evento.participarEvento)


module.exports = router