var ComentariosService = require('../services/comentarios.services');



exports.createComentario = async function (req, res, next) {
    try {
        var comentarioData = {
            servicioId: req.params.servicioId,
            comentarioCliente: req.body.comentarioCliente, 
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


exports.getComentariosByProveedor = async function (req, res, next) {
    try {
        const proveedorId = req.userId; 
        var comentarios = await ComentariosService.getComentariosByProveedorId(proveedorId, 'pendiente'); 
        res.status(200).json({ comentarios: comentarios, message: "Comentarios retrieved successfully" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.getComentariosByServicioAndEstado = async function (req, res, next) {
    try {
       
        var comentarios = await ComentariosService.getComentariosByServicioAndEstado(
            req.params.servicioId,
            req.query.estado
        );
        res.status(200).json({ comentarios: comentarios, message: "Comentarios retrieved successfully" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};