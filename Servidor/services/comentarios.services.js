var Comentario = require('../models/comentarios.model'); // Asegúrate de que la ruta sea correcta

// Función para crear un nuevo comentario
exports.createComentario = async function (comentarioData) {
    // Asumimos que comentarioData ya incluye servicioId y proveedorId
    var newComentario = new Comentario({
        servicioId: comentarioData.servicioId, // ID del servicio
        proveedorId: comentarioData.proveedorId, // ID del proveedor (usuario)
        comentario: comentarioData.comentario,
        estado: comentarioData.estado, // 'pendiente' por defecto si no se provee
        calificacion: comentarioData.calificacion
    });

    try {
        var savedComentario = await newComentario.save();
        return savedComentario;
    } catch (e) {
        throw Error('Error while Creating Comentario: ' + e.message);
    }
};

// Función para actualizar el estado de un comentario
exports.updateEstadoComentario = async function (comentarioId, nuevoEstado) {
    try {
        var comentario = await Comentario.findById(comentarioId);
        if (!comentario) {
            throw Error('Comentario not found');
        }

        comentario.estado = nuevoEstado;
        
        var updatedComentario = await comentario.save();
        return updatedComentario;
    } catch (e) {
        // Manejar errores aquí
        throw Error('Error while updating Comentario: ' + e.message);
    }
};

exports.getComentariosByEstado = async function (estado) {
    try {
        var comentarios = await Comentario.find({ estado: estado });
        return comentarios;
    } catch (e) {
        // Manejo de errores
        throw Error('Error while Getting Comentarios by estado');
    }
};