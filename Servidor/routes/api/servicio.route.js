var express = require('express');
var router = express.Router();
var ServicioController = require('../../controllers/servicio.controller');
var Authorization = require('../../auth/authorization');

// Ruta para crear un nuevo servicio
router.post('/crearsv', Authorization ,ServicioController.createServicio);

// Ruta para obtener todos los servicios con paginación
router.get('/obtenersv', Authorization ,ServicioController.getAllServicios);

// Ruta para obtener los servicios por estado con paginación
router.get('/estado/:estado', Authorization ,ServicioController.getServiciosByEstado);

// Ruta para obtener un servicio específico por ID
router.get('/:id', Authorization ,ServicioController.getServicioById);

// Ruta para actualizar un estado del servicio específico por ID
router.patch('/cambiarestado/:id', Authorization ,ServicioController.updateEstadoServicio);

// Ruta para eliminar un servicio específico por ID
router.delete('/borrar/:id', Authorization ,ServicioController.removeServicio);

module.exports = router;