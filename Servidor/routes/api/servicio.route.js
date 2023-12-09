var express = require('express');
var router = express.Router();
var ServicioController = require('../../controllers/servicio.controller');
var Authorization = require('../../auth/authorization');

// Ruta para crear un nuevo servicio
router.post('/crearsv', Authorization ,ServicioController.createServicio);
// Ruta para obtener todos los servicios con paginación

router.get('/getservicios', Authorization, ServicioController.getServiciosByUser);
// Ruta para obtener los servicios por estado con paginación
router.get('/estado/:estado' ,ServicioController.getServiciosByEstado);
router.get('/nombres', ServicioController.getNombreServicios);
// Ruta para obtener un servicio específico por ID
router.get('/getservicio/:id', Authorization ,ServicioController.getServicioById);
// Ruta para actualizar un estado del servicio específico por ID
router.patch('/cambiarestado/:id', Authorization ,ServicioController.updateEstadoServicio);
// Ruta para eliminar un servicio específico por ID
router.delete('/borrar/:id', Authorization ,ServicioController.removeServicio);
//Ruta para actualizar un servicio
router.patch('/editServicio/:id', ServicioController.editServicio);


module.exports = router;