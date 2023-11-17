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
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/users',Authorization, UserController.getUsers)
router.post('/userByMail', Authorization, UserController.getUsersByMail)
router.patch('/update', Authorization, UserController.updateUser)
router.delete('/delete', Authorization, UserController.removeUser)

//router.patch('/update_image', Authorization, upload.single('imgProfile'), UserController.uploadProfileImage);

router.patch('/update_image', Authorization ,upload.single('imgProfile'), UserController.uploadProfileImage);

module.exports = router;


