const router = require("express").Router();
const UserController = require("../modules/user/user.controller");
const AuthMidelware = require('../middleware/auth.middleware');

router.get('/',                 [AuthMidelware.basic, UserController.userInfo]);
router.post('/update',              [AuthMidelware.basic, UserController.updateUser]);
// router.get('/deleteuser',           [AuthMidelware.basic, UserController.deleteUser]);



module.exports = router;
