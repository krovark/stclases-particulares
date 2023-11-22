
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ComentarioSchema = new mongoose.Schema({
    servicioId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Servicio' // Asegúrate de reemplazar 'Servicio' con el nombre del modelo de servicios si es diferente
    },
    proveedorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User' // Referencia al modelo de usuarios
    },
    comentario: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'aprobado', 'rechazado'], // Enum para los posibles estados de un comentario
        default: 'pendiente'
    },
    calificacion: {
        type: Number,
        required: true,
        min: 1, // La calificación mínima posible
        max: 5  // La calificación máxima posible
    },
    fechaCreacion: {
        type: Date,
        default: Date.now // Fecha de creación por defecto al momento de guardar el documento
    }
},{collection: 'comentarios'});

// Agrega paginación al esquema
ComentarioSchema.plugin(mongoosePaginate);

// Crea el modelo 'Comentario' basado en el esquema
const Comentario = mongoose.model('Comentario', ComentarioSchema);

module.exports = Comentario;