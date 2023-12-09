const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/users.controller');
const multer = require('../../auth/multerConfig');
const upload = require('../../auth/multerConfig');
const Authorization = require('../../auth/authorization');



router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/registration', UserController.createUser); //registro
router.post('/login', UserController.loginUser); //login
router.post('/logout', UserController.logoutUser); //logout
router.get('/me', Authorization, UserController.getProfile); //trae los datos del usuario logueado
router.patch('/update', Authorization, UserController.updateUser); //actualiza los datos del usuario
router.patch('/update_image', Authorization ,upload.single('imgProfile'), UserController.uploadProfileImage); //actualiza el estado 
router.post('/forgot-password', UserController.forgotPassword); //olvide la contraseña
router.post('/reset-password', UserController.resetPassword); //cambia la contraseña


router.post('/logout', (req, res) => {
  res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
  res.status(200).send({ message: 'Logout successful' });
});




module.exports = router;


