/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
var jwt = require('jsonwebtoken');
var config = require('../config').config();

// var authorization = function (req, res, next) {

//     //var token = req.headers['x-access-token'];
//     var token = req.cookies.jwt;
//     console.log("token: ---------- ",token);
//     // var msg = {auth: false, message: 'No token provided.'};
//     if (!token)
        
//         return res.status(403).send({ auth: false, message: 'No token provided.' });

//     let sec = process.env.SECRET;
//    // console.log("secret",sec)
//     jwt.verify(token, sec, function (err, decoded) {
//         var msg = {auth: false, message: 'Failed to authenticate token.'};
//         if (err)
//         console.error("Error al verificar JWT:", err); // Imprimir el error en la consola
//         return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    
//         req.userId = decoded.id;
//         next();
//     });
// }



var authorization = function (req, res, next) {
    var token = req.cookies.jwt;
    console.log("Token recibido:", token);

    if (!token) {
        console.log("No se proporcionó token");
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    let sec = process.env.SECRET;
    console.log("Clave secreta utilizada:", sec);

    jwt.verify(token, sec, function (err, decoded) {
        if (err) {
            console.error("Error al verificar JWT:", err);
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        console.log("JWT verificado, ID de usuario:", decoded.id);
        req.userId = decoded.id;
        next();
    });
};


module.exports = authorization;