const express = require('express');
const router = express.Router();
const ContratacionController = require('../../controllers/contratacion.controller');
var Authorization = require('../../auth/authorization');

router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/contrataciones.routes');
  });


router.post('/contratar', ContratacionController.createContratacion);
router.get('/allcontrataciones', Authorization, ContratacionController.getAllContrataciones);
router.patch('/editarcontratacion/:id', Authorization, ContratacionController.updateEstadoContratacion);
router.get('/contrataciones/me', Authorization, ContratacionController.getContratacionesByUsuario);


module.exports = router;