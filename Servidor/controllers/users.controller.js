var UserService = require('../services/user.service');
const multer = require('../auth/multerConfig');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
exports.getUsersByMail = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {email: req.body.email}
    console.log(filtro)
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var User = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        password: req.body.password, 
        titulo: req.body.titulo,
        experiencia: req.body.experiencia,
        calificacionPromedio: req.body.calificacionPromedio,
        imgProfile: req.body.imgProfile,
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: req.body.resetPasswordExpires, 
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        console.log("hola")
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (e) {
        if (e.message === 'El email ya se encuentra registrado.') {
            // Devolver un código de estado HTTP 409 si el email ya está registrado
            return res.status(409).json({ message: e.message });
        }
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

// exports.updateUser = async function (req, res, next) {

//     // Id is necessary for the update
//     if (!req.body.name) {
//         console.log("hola");
//         return res.status(400).json({status: 400., message: "Name be present"})
//     }

//     var User = {
       
//         _id: req.body._id,
//         nombre: req.body.nombre,
//         apellido: req.body.apellido,
//         email: req.body.email,
//         telefono: req.body.telefono,
//         password: req.body.password, 
//         titulo: req.body.titulo,
//         experiencia: req.body.experiencia,
//         calificacionPromedio: req.body.calificacionPromedio
//     }

//     try {
//         var updatedUser = await UserService.updateUser(User)
//         return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
//     } catch (e) {
//         return res.status(400).json({status: 400., message: e.message})
//     }
// }

exports.updateUser = async function (req, res, next) {
    
    var userId = req.userId; 

    var userUpdateData = {
        telefono: req.body.telefono,
        titulo: req.body.titulo,
        experiencia: req.body.experiencia,
       
    };
    console.log(req.body)
    try {
        var updatedUser = await UserService.updateUser(userId, userUpdateData);
        return res.status(200).json({status: 200, data: updatedUser, message: "Successfully Updated User"});
    } catch (e) {
        console.error(e);
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.removeUser = async function (req, res, next) {

    var id = req.body.id;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}


// exports.loginUser = async function (req, res, next) {
//     // Req.Body contains the form submit values.
//     console.log("body",req.body)
//     var User = {
//         email: req.body.email,
//         password: req.body.password
//     }
//     try {
//         // Calling the Service function with the new object from the Request Body
//         var loginUser = await UserService.loginUser(User);
//         if (loginUser===0)
//             return res.status(400).json({message: "Error en la contraseña"})
//         else
//             return res.status(201).json({loginUser, message: "Inicio de Sesion Exitoso"})
//     } catch (e) {
//         //Return an Error Response Message with Code and the Error Message.
//         return res.status(400).json({status: 400, message: "Invalid username or password"})
//     }
// }

exports.loginUser = async function (req, res, next) {
    
    console.log("body",req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        var loginUser = await UserService.loginUser(User);

        if (loginUser === 0) {
            console.log("Email controller", email);
            console.log("password controller", password);
            return res.status(400).json({ message: "Error en la contraseña" });
        } else {
            // Genera token
            var token = jwt.sign({ id: loginUser.user._id }, process.env.SECRET, { expiresIn: 86400 });
            console.log(token);
            res.cookie('jwt', token, {
              httpOnly: true,
              secure: false,
              maxAge: 86400000 // tiempo de vida de la cookie 24 horas
            });

            return res.status(201).json({ loginUser, message: "Succesfully login" });
        }
    } catch (e) {
        console.error("Error en loginUser:", e);
        return res.status(400).json({ status: 400, message: "Invalid username or password" });
    }
};

exports.logoutUser = function(req, res) {
    res.cookie('jwt', '', { expires: new Date(0) });
    res.status(200).send({ message: 'Logout successful' });
};


exports.uploadProfileImage = async function(req, res) {
    try {
      const userId = req.userId; // Asumimos que el userId viene de un middleware de autenticación
      const imageBuffer = req.file.buffer; // Asumimos que estás utilizando middleware como multer para manejar la carga de archivos
  
      const user = await UserService.updateProfileImage(userId, imageBuffer);
  
      res.status(200).json({
        message: "Profile image updated successfully",
        user: user
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  };
    
  exports.getProfile = async function(req, res) {
    try {
        const userId = req.userId; // Asumiendo que el middleware JWT ha establecido req.userId
        const user = await UserService.getProfile(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log(userId);
        // Opcionalmente, excluye campos sensibles como la contraseña antes de enviarlos
        user.password = undefined;
        //console.log(token)
        return res.status(200).json(user);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Error al recuperar el perfil del usuario' });
    }
};






// exports.uploadProfileImage = async function(req, res) {
//     multer.single('imgProfile')(req, res, async function(err) {
//       if (err) {
//         return res.status(400).json({ message: err.message });
//       }
//       if (!req.file) {
//         return res.status(400).json({ message: "Please upload a file." });
//       }
  
//       try {
//         const userId = req.userId; // Asumimos que el userId viene de un middleware de autenticación
//         const user = await UserService.updateProfileImage(userId, req.file.buffer);
//         res.status(200).json({
//           message: "Profile image updated successfully",
//           user: user
//         });
//       } catch (e) {
//         res.status(500).json({ message: e.message });
//       }
//     });
//   };


