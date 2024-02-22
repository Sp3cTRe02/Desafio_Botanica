
const { Router } = require('express');
const router = Router()
const { StatusCodes } = require('http-status-codes')
const mailController = require('../controllers/mailController')

router.get ('/', mailController.enviarCorreo)

module. exports = router
