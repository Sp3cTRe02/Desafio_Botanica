
const { Router } = require('express');
const router = Router()
const { StatusCodes } = require('http-status-codes')
const mailController = require('../controllers/mailController')
const { mandarEmailRecuperacion } = require('../controllers/mailController');

router.get ('/', mailController.enviarCorreo)

router.put('/', mailController.recuperarPassword )
module. exports = router
