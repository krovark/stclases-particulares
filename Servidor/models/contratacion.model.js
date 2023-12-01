const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

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
        enum: ['Solicitada', 'Confirmada', 'Cancelada', 'Finalizada'], 
        default: 'Solicitada'
    },
    cantclases: {
        type: Number,
        required: true
    },
    fechaContratacion: {
        type: Date,
        default: Date.now
    }
},{collection: 'contratacions'});

ContratacionSchema.plugin(mongoosePaginate);

const Contratacion = mongoose.model('Contratacion', ContratacionSchema);
module.exports = Contratacion;