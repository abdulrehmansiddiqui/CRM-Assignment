const router = require('express').Router();
const AuthMidelware = require("../middleware/admin.middleware");
const AdminController = require('../modules/admin/admin.controller');

router.post('/reg',         [AdminController.reg])
router.post('/login',       [AdminController.login])

router.get('/',             [AuthMidelware.basic, AdminController.userInfo])
router.post('/singleuser',  [AuthMidelware.basic, AdminController.singleUser])
router.post('/updateuser',  [AuthMidelware.basic, AdminController.updateUser])
router.get('/allusers',     [AuthMidelware.basic, AdminController.allUsers])
router.post('/deleteuser',  [AuthMidelware.basic, AdminController.deleteUser])

module.exports = router;