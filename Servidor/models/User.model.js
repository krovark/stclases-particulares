var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    email: { type: String, unique: true, required: true},
    telefono: String,  
    password: { type: String, required: true},
    titulo: { type: String, required: false},  
    experiencia: { type: String, required: true},
    calificacionPromedio: Number,
    imgProfile: {
        type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
},{collection: 'users'})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;
