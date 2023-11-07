var express = require('express');
var router = express.Router();
var Authorization = require('../../auth/authorization');
var ComentariosController = require('../../controllers/comentarios.controller');


router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/comentarios.routes');
  });


router.post('/newcomentario', Authorization, ComentariosController.createComentario); // Crear un nuevo comentario
router.get('/allcomentarios', Authorization, ComentariosController.getAllComentarios); // Obtener todos los comentarios
router.get('/:id', Authorization, ComentariosController.getComentarioById); // Obtener un comentario por ID
router.patch('/:id/estado', Authorization, ComentariosController.updateEstadoComentario); // Actualizar solo el estado de un comentario


module.exports = router;


