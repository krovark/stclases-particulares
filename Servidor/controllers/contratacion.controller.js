const Servicio = require('../models/servicio.model');
const ContratacionService = require ('../services/contratacion.services')

exports.createContratacion = async function(req, res) {
    try {
        const servicioId = req.params.id; // Asegúrate de que la ruta sea /contratar/:id
        const servicio = await Servicio.findById(servicioId);

        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        const contratacionData = {
            servicioId,
            cliente: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono
            },
            estado: req.body.estado,
            cantclases: req.body.cantclases,
            fechaContratacion: req.body.fechaContratacion
        };

        const contratacionCreada = await ContratacionService.createContratacion(contratacionData);
        res.status(201).json({ data: contratacionCreada, message: 'Contratación creada y email enviado con éxito.' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};




exports.getAllContrataciones = async function(req, res) {
    try {
        const contrataciones = await ContratacionService.getAllContrataciones();
        res.status(200).json({ data: contrataciones, message: 'Contrataciones retrieved successfully.' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};


exports.updateEstadoContratacion = async function(req, res) {
    try {
        const contratacionId = req.params.id;
        const nuevoEstado = req.body.estado;

        const updatedContratacion = await ContratacionService.updateEstadoContratacion(contratacionId, nuevoEstado);
        res.status(200).json({ data: updatedContratacion, message: 'Contratación updated successfully.' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.getContratacionesByUsuario = async function (req, res) {
    const userId = req.userId; // Suponiendo que el ID del usuario está en req.userId
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 25;

    try {
        const contrataciones = await ContratacionService.getContratacionesByUsuario(userId, page, limit);
        res.status(200).json({ data: contrataciones.docs, message: 'Contrataciones retrieved successfully' });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};