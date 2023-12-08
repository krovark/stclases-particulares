var express = require('express');
var router = express.Router();
var Authorization = require('../../auth/authorization');
var ComentariosController = require('../../controllers/comentarios.controller');


router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/comentarios.routes');
  });


 
router.post('/comentar/:servicioId', ComentariosController.createComentario);

router.get('/proveedor', Authorization, ComentariosController.getComentariosByProveedor);

router.get('/comentario/:servicioId', ComentariosController.getComentariosByServicioAndEstado);

router.patch('/cambiarestadocomentario/:id', Authorization, ComentariosController.updateEstadoComentario); // Actualizar solo el estado de un comentario



module.exports = router;


