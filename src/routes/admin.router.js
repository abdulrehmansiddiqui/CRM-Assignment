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

router.get('/lead',                 [AuthMidelware.basic, AdminController.allLead])
router.post('/lead/alluser',        [AuthMidelware.basic, AdminController.allLeadbyUser])
router.post('/lead/add',            [AuthMidelware.basic, AdminController.addLead])
router.post('/lead/update',         [AuthMidelware.basic, AdminController.updateLead])
router.post('/lead/delete',         [AuthMidelware.basic, AdminController.deleteLead])

module.exports = router;