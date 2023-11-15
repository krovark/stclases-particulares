var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/users',Authorization, UserController.getUsers)
router.post('/userByMail', Authorization, UserController.getUsersByMail)
router.patch('/update', Authorization, UserController.updateUser)
router.delete('/delete', Authorization, UserController.removeUser)
router.patch('/profile/image', upload.single('image'), UserController.updateProfileImage);


// Export the Router
module.exports = router;


