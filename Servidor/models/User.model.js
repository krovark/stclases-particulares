var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    nombre: String,  
    apellido: String,  
    email: { type: String, unique: true, required: true},
    telefono: String,  
    password: String,
    titulo: String,  
    experiencia: String,  
    calificacionPromedio: Number  
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;