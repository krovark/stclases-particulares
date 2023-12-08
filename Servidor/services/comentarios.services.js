var Comentario = require('../models/comentarios.model'); 
var Servicio = require('../models/servicio.model');
var User = require('../models/User.model')


// Función para crear un nuevo comentario
exports.createComentario = async function (comentarioData) {
    try {
       
        const servicio = await Servicio.findById(comentarioData.servicioId);
        if (!servicio) {
            throw Error('Servicio no encontrado');
        }

        var newComentario = new Comentario({
            servicioId: comentarioData.servicioId,
            proveedorId: servicio.proveedorId, 
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

exports.updateEstadoComentario = async function (comentarioId, nuevoEstado) {
    try {
        var comentario = await Comentario.findById(comentarioId);
        if (!comentario) {
            throw new Error('Comentario no encontrado');
        }

        comentario.estado = nuevoEstado;
        var updatedComentario = await comentario.save();

        // Si el estado es 'aprobado', actualiza la calificación promedio del proveedor
        if (nuevoEstado === 'aprobado') {
            await actualizarCalificacionPromedio(comentario.proveedorId);
        }

        return updatedComentario;
    } catch (e) {
        throw new Error('Error al actualizar el comentario: ' + e.message);
    }
};

// Función para actualizar la calificación promedio del proveedor
async function actualizarCalificacionPromedio(proveedorId) {
    try {
        const comentariosAprobados = await Comentario.find({ proveedorId: proveedorId, estado: 'aprobado' });
        const sum = comentariosAprobados.reduce((acc, comentario) => acc + comentario.calificacion, 0);
        const promedio = sum / comentariosAprobados.length;

        await User.findByIdAndUpdate(proveedorId, { calificacionPromedio: promedio });

    } catch (e) {
        throw new Error('Error al actualizar la calificación promedio: ' + e.message);
    }
}


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