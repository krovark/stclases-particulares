// var express = require('express')
// var router = express.Router()
// var UserController = require('../../controllers/users.controller');
// var Authorization = require('../../auth/authorization');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });



const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/users.controller');
const multer = require('../../auth/multerConfig');
const upload = require('../../auth/multerConfig');
const Authorization = require('../../auth/authorization');



router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/registration', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.get('/users',Authorization, UserController.getUsers);
router.get('/me', Authorization, UserController.getProfile);
router.post('/userByMail', Authorization, UserController.getUsersByMail);
router.patch('/update', Authorization, UserController.updateUser);
router.delete('/delete', Authorization, UserController.removeUser);
router.patch('/update_image', Authorization ,upload.single('imgProfile'), UserController.uploadProfileImage);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);


router.post('/logout', (req, res) => {
  res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
  res.status(200).send({ message: 'Logout successful' });
});




module.exports = router;


