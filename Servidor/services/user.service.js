// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('../auth/cloudinaryConfig');


// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Users = await User.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
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
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        //return token;
        return { user: savedUser, token: token };
    } catch (e) {
        if (e.code === 11000) { // Verificar si el error es un error de duplicidad de MongoDB
            // Lanzar un nuevo Error que será manejado en el controlador
            throw new Error('El email ya se encuentra registrado.');
        } else {
            // Lanzar un Error genérico o puedes manejar otros códigos específicos
            throw new Error('Error while Creating User: ' + e.message);
        }
    }
}

exports.updateUser = async function (user) {
    
    //var id = {name :user.name}

    var id = { _id: user._id };
    console.log("######################################");
    console.log(id);
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne(id);
        console.log (oldUser)
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
        if (user.nombre) oldUser.nombre = user.nombre;
        if (user.apellido) oldUser.apellido = user.apellido;
        if (user.email) oldUser.email = user.email;
        if (user.telefono) oldUser.telefono = user.telefono;
        if (user.password) oldUser.password = bcrypt.hashSync(user.password, 8);
        if (user.titulo) oldUser.titulo = user.titulo;
        if (user.experiencia) oldUser.experiencia = user.experiencia;
        if (user.calificacionPromedio) oldUser.calificacionPromedio = user.calificacionPromedio;
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}



exports.deleteUser = async function (id) {
    console.log(id)
    // Delete the User
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
    // Creating a new Mongoose Object by using the new keyword
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
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error invalid password")
    }

}

// exports.updateProfileImage = async function(req, res) {
//     try {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         const user = await UserService.updateProfileImage(req.userId, result.secure_url);
//         res.status(200).json({ user, message: 'Profile image updated successfully' });
//     } catch (e) {
//         res.status(400).json({ message: e.message });
//     }
// };


// exports.updateProfileImage = async function(userId, imageBuffer) {
//     try {
//       const result = await cloudinary.uploader.upload_stream({
//         resource_type: 'image',
//       }, (error, result) => {
//         if (error) throw new Error('Error uploading to Cloudinary: ' + error.message);
//         return result;
//       }).end(imageBuffer);
  
//       const user = await User.findById(userId);
//       if (!user) {
//         throw new Error('User not found');
//       }
  
//       user.imgProfile = result.secure_url;
//       await user.save();
  
//       return user;
//     } catch (e) {
//       throw new Error('Error while updating profile image: ' + e.message);
//     }
//   };

exports.updateProfileImage = async function(userId, imageBuffer) {
    try {
      
      const imageBase64 = imageBuffer.toString('base64');
      const imageData = `data:image/jpeg;base64,${imageBase64}`;
  
      const result = await cloudinary.uploader.upload(imageData);
  
      
      const user = await User.findByIdAndUpdate(userId, { imgProfile: result.secure_url }, { new: true });
      
      return user;
    } catch (e) {
      throw new Error('Error while updating profile image: ' + e.message);
    }
  };

  exports.getProfile = async function(userId) {
    try {
        const user = await User.findById(userId, 'email nombre apellido titulo experiencia telefono calificacionPromedio');
        return user;
    } catch (error) {
        throw new Error('Error al obtener el usuario: ' + error.message);
    }
};

