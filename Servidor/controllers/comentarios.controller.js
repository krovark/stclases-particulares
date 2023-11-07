var ComentariosService = require('../services/comentarios.services');



exports.createComentario = async function (req, res, next) {
    try {
        // El cuerpo de la solicitud debe incluir servicioId y proveedorId
        var comentarioData = {
            servicioId: req.body.servicioId,
            proveedorId: req.body.proveedorId,
            comentario: req.body.comentario,
            estado: req.body.estado,
            calificacion: req.body.calificacion
        };
        
        var createdComentario = await ComentariosService.createComentario(comentarioData);
        res.status(201).json({ comentario: createdComentario, message: "Comentario successfully created" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.getAllComentarios = async function (req, res, next) {
    try {
        // Podrías pasar filtros o paginación a través de req.query si es necesario
        var comentarios = await ComentariosService.getAllComentarios();
        res.status(200).json({ comentarios: comentarios, message: "Comentarios successfully retrieved" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.getComentarioById = async function (req, res, next) {
    try {
        var comentario = await ComentariosService.getComentarioById(req.params.id);
        res.status(200).json({ comentario: comentario, message: "Comentario successfully retrieved" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.updateEstadoComentario = async function (req, res, next) {
    try {
        var updatedComentario = await ComentariosService.updateEstadoComentario(req.params.id, req.body.estado);
        res.status(200).json({ comentario: updatedComentario, message: "Comentario successfully updated" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.deleteComentario = async function (req, res, next) {
    try {
        var deleted = await ComentariosService.deleteComentario(req.params.id);
        res.status(200).json({ message: "Comentario successfully deleted", deleted: deleted });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};