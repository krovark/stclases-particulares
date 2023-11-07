/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var comentarios = require('./api/comentarios.route')

router.use('/users', users);
router.use('/comentarios', comentarios);
module.exports = router;
