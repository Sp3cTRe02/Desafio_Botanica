const { Router } = require('express')
const router = Router()
const contenido = require('../controllers/contenidoController')
const { check } = require('express-validator')
const validarCampos = require('../middlewares/validarCampos')
const midAdmin = require('../middlewares/validarAdmin')
const midsJWT = require("../middlewares/validarJWT");
const { validarArchivoSubir } = require('../middlewares/validarArchivo')

/**
 * @David_Trujillo
 */


const validator = [
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('resumenDesc')
        .isLength({ max: 65 })
        .withMessage('El resumen debe tener como máximo 65 caracteres'),
    check('resumenDesc', 'El resumen de la descripción es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos
]

//Inicio
router.get('/inicio',contenido.getInfoInicio)
router.put('/inicio/:id',contenido.modificarContenidoInicio)

//Noticias
router.get('/', contenido.getContenido)
router.get('/ultimas-noticias', contenido.getUltimasNoticias)
router.get('/:id', contenido.getInfoNoticia)
router.get('/upload/:id',contenido.mostrarImagen)
router.post('/', [midsJWT.validarJWT,validator], contenido.crearContenido)
router.put('/:id', [midsJWT.validarJWT],contenido.modificarContenido)
router.delete('/:id',[midsJWT.validarJWT, midAdmin.verificarAdmin],  contenido.eliminarContenido)


module.exports = router