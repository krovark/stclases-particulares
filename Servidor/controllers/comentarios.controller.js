var ComentariosService = require('../services/comentarios.services');



exports.createComentario = async function (req, res, next) {
    try {
        var comentarioData = {
            servicioId: req.params.servicioId, 
            comentario: req.body.comentario,
            estado: 'pendiente', 
            calificacion: req.body.calificacion
        };
        
        var createdComentario = await ComentariosService.createComentario(comentarioData);
        console.log(comentarioData);
        res.status(201).json({ comentario: createdComentario, message: "Comentario successfully created" });
    } catch (e) {
        console.error(e);
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

exports.getComentariosByEstado = async function (req, res, next) {
    try {
        var comentarios = await ComentariosService.getComentariosByEstado(req.params.estado);
        res.status(200).json({ comentarios: comentarios, message: "Comentarios successfully retrieved" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.getComentariosByProveedor = async function (req, res, next) {
    try {
        // Asumimos que el proveedorId viene como parámetro en la ruta, por ejemplo: /api/comentarios/proveedor/:proveedorId
        var comentarios = await ComentariosService.getComentariosByProveedorId(req.params.proveedorId);
        res.status(200).json({ comentarios: comentarios, message: "Comentarios retrieved successfully" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.getComentariosByProveedorAndEstado = async function (req, res, next) {
    try {
       
        var comentarios = await ComentariosService.getComentariosByProveedorIdAndEstado(
            req.params.proveedorId,
            req.query.estado
        );
        res.status(200).json({ comentarios: comentarios, message: "Comentarios retrieved successfully" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};