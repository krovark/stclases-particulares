var Comentario = require('../models/comentarios.model'); // Asegúrate de que la ruta sea correcta
var Servicio = require('../models/servicio.model');


// Función para crear un nuevo comentario
exports.createComentario = async function (comentarioData) {
    try {
        // Busca el servicio para obtener el proveedorId
        const servicio = await Servicio.findById(comentarioData.servicioId);
        if (!servicio) {
            throw Error('Servicio no encontrado');
        }

        var newComentario = new Comentario({
            servicioId: comentarioData.servicioId,
            proveedorId: servicio.proveedorId, // Obtén el proveedorId del servicio
            comentarioCliente: comentarioData.comentarioCliente,
            comentario: comentarioData.comentario,
            estado: comentarioData.estado || 'pendiente', // Usa 'pendiente' como valor por defecto
            calificacion: comentarioData.calificacion
        });

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

exports.getComentariosByProveedorId = async function (proveedorId, estado) {
    try {
        var comentarios = await Comentario.find({ 
            proveedorId: proveedorId,
            estado: estado 
        }).populate('servicioId', 'nombre');
        return comentarios;
    } catch (e) {
        throw Error('Error while Getting Comentarios by Proveedor ID and Estado: ' + e.message);
    }
};


exports.getComentariosByServicioAndEstado = async function (servicioId, estado) {
    try {
        var comentarios = await Comentario.find({ 
            servicioId: servicioId,
            estado: estado
        });
        return comentarios;
    } catch (e) {
        throw Error('Error while Getting Comentarios by Proveedor ID and Estado: ' + e.message);
    }
};