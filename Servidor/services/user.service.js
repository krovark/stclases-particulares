var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('../auth/cloudinaryConfig');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

_this = this


exports.createUser = async function (user) {
   
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    

    var newUser = new User({

        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: user.telefono,
        password: hashedPassword,
        titulo: user.titulo,
        experiencia: user.experiencia,
        calificacionPromedio: user.calificacionPromedio,
        imgProfile: user.imgProfile,
        resetPasswordToken: user.resetPasswordToken,
        resetPasswordExpires: user.resetPasswordExpires,  
    })

    try {
        
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 
        });
        
        return { user: savedUser, token: token };
    } catch (e) {
        if (e.code === 11000) { // Verificar si el error es un error de duplicidad de MongoDB
            
            throw new Error('El email ya se encuentra registrado.');
        } else {
           
            throw new Error('Error while Creating User: ' + e.message);
        }
    }
}


exports.updateUser = async function (userId, userUpdateData) {
    try {
        
        var oldUser = await User.findById(userId);
        if (!oldUser) {
            throw Error("User not found");
        }

        
        if (userUpdateData.telefono) oldUser.telefono = userUpdateData.telefono;
        if (userUpdateData.titulo) oldUser.titulo = userUpdateData.titulo;
        if (userUpdateData.experiencia) oldUser.experiencia = userUpdateData.experiencia;
       

        
        var savedUser = await oldUser.save();
        return savedUser;
    } catch (e) {
        throw Error("Error occurred while updating the User: " + e.message);
    }
}


exports.deleteUser = async function (id) {
    console.log(id)
   
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {
    console.log("Email recibido:", user.email);
    console.log("Contraseña recibida:", user.password);
    
    try {
         

        console.log("login:",user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 
        });
        return {token:token, user:_details};
    } catch (e) {
             
        throw Error("Error invalid password")
    }

}


exports.updateProfileImage = async function(userId, imageBuffer) {
    try {
      
      const imageBase64 = imageBuffer.toString('base64');
      const imageData = `data:image/jpeg;base64,${imageBase64}`;
  
      const result = await cloudinary.uploader.upload(imageData);
  
      
      const user = await User.findByIdAndUpdate(userId, { imgProfile: result.secure_url }, { new: true });
      
      return user;
    } catch (e) {
        console.error(e);
      throw new Error('Error while updating profile image: ' + e.message);

    }
  };

  exports.getProfile = async function(userId) {
    try {
        const user = await User.findById(userId, 'email nombre apellido titulo experiencia telefono calificacionPromedio imgProfile calificacionPromedio');
        return user;
    } catch (error) {
        throw new Error('Error al obtener el usuario: ' + error.message);
    }
};


exports.forgotPassword = async function(email) {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('No existe una cuenta con ese email.');
    }

    const token = crypto.randomBytes(10).toString('hex');
    user.resetPasswordToken = token;
    console.log(token);
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: 'santiagojgonzalez@uade.edu.ar', 
        subject: 'Password Reset',
        text: `Por favor, usa el siguiente token para restablecer tu contraseña: ${token}`
    };

    await sgMail.send(msg);
    return { token };
};

exports.resetPassword = async function(token, password) {
    var hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.findOne({ 
        resetPasswordToken: token, 
        resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) {
        throw new Error('Token inválido o expirado.');
    }

    user.password = hashedPassword; 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
};