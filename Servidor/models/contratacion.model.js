const mongoose = require('mongoose');

const ContratacionSchema = new mongoose.Schema({
    servicioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    cliente: {
        nombre: String,
        apellido: String,
        email: String,
        telefono: String
    },
    estado: {
        type: String,
        enum: ['solicitada', 'confirmada', 'cancelada'], // Agrega más estados según sea necesario
        default: 'solicitada'
    },
    cantclases: {
        type: Number,
        required: true
    },
    fechaContratacion: {
        type: Date,
        default: Date.now
    }
});

const Contratacion = mongoose.model('Contratacion', ContratacionSchema);
module.exports = Contratacion;