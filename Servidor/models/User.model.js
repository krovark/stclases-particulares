var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    telefono: String,  
    password: { type: String, required: true},
    titulo: String,  
    experiencia: String,  
    calificacionPromedio: Number,
    imgProfile: {
        type: String,
        default: ''
    },  
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;