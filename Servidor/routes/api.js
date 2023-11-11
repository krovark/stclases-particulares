/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var comentarios = require('./api/comentarios.route')
var servicios = require('./api/servicio.route') 

router.use('/users', users);
router.use('/comentarios', comentarios);
router.use('/servicios', servicios);
module.exports = router;
