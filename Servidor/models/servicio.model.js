var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ServicioSchema = new mongoose.Schema({
    proveedorId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    nombre: {
        type: String,
        required: true
    },
    tipoClase: {
        type: String,
        required: true,
        enum: ['Grupal', 'Individual'] // Solo admite 'Grupal' o 'Individual'
    },
    descripcion: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: false
    },
    experiencia: {
        type: String,
        required: false
    },
    duracion: {
        type: Number, // Duración en minutos
        required: true
    },
    frecuencia: {
        type: String,
        required: true,
        enum: ['Única', 'Semanal', 'Mensual'] // Solo admite 'Única', 'Semanal' o 'Mensual'
    },
    costo: {
        type: Number, // Para manejar valores decimales
        required: true
    },
    calificacion: {
        type: Number,
        default: 0 // La calificación inicial podría ser 0 si se calcula como promedio
    },
    estado: {
        type: String,
        required: true,
        enum: [ 'activo', 'desactivado'],
        default: 'activo' 
    },
    
},{collection: 'servicios'});

// Agrega la paginación al esquema
ServicioSchema.plugin(mongoosePaginate);

// Crea el modelo 'Servicio' basado en el esquema
const Servicio = mongoose.model('Servicio', ServicioSchema);

module.exports = Servicio;

