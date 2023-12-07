var Comentario = require('../models/comentarios.model'); // Asegúrate de que la ruta sea correcta
var Servicio = require('../models/servicio.model');
var User = require('../models/User.model')


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
// exports.updateEstadoComentario = async function (comentarioId, nuevoEstado) {
//     try {
//         var comentario = await Comentario.findById(comentarioId);
//         if (!comentario) {
//             throw Error('Comentario not found');
//         }

//         comentario.estado = nuevoEstado;
        
//         var updatedComentario = await comentario.save();
//         if (nuevoEstado === 'aprobado') {
//             await actualizarCalificacionPromedio(comentario.proveedorId);
//             console.log(comentario.proveedorId);
//         }
//         return updatedComentario;
//     } catch (e) {
//         // Manejar errores aquí
//         throw Error('Error while updating Comentario: ' + e.message);
//     }
// };

// async function actualizarCalificacionPromedio(userId) {
//     try {
//         const comentarios = await Comentario.find({ proveedorId: userId, estado: 'aprobado' });
//         if (comentarios.length > 0) {
//             const totalCalificacion = comentarios.reduce((acc, comentario) => acc + comentario.calificacion, 0);
//             const promedio = totalCalificacion / comentarios.length;
//             console.log(promedio);
//             console.log(totalCalificacion);
//             await User.findByIdAndUpdate(userId, { calificacionPromedio: promedio });
//         }
//     } catch (error) {
//         console.error('Error al actualizar la calificación promedio:', error);
//     }
// }

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