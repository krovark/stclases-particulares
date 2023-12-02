var express = require('express');
var router = express.Router();
var Authorization = require('../../auth/authorization');
var ComentariosController = require('../../controllers/comentarios.controller');


router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/comentarios.routes');
  });


 
router.post('/comentar/:servicioId', ComentariosController.createComentario);
router.get('/allcomentarios', Authorization, ComentariosController.getAllComentarios); // Obtener todos los comentarios
router.get('/proveedor/:proveedorId', Authorization, ComentariosController.getComentariosByProveedor);
router.get('/proveedorestado/:proveedorId', Authorization, ComentariosController.getComentariosByProveedorAndEstado);
router.get('/:id', Authorization, ComentariosController.getComentarioById); // Obtener un comentario por ID
router.patch('/cambiarestadocomentario/:id', Authorization, ComentariosController.updateEstadoComentario); // Actualizar solo el estado de un comentario
router.get('/estado/:estado', Authorization, ComentariosController.getComentariosByEstado);
router.delete('/:id', Authorization, ComentariosController.deleteComentario);
module.exports = router;


