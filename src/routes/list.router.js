const router = require('express').Router()
const AuthMidelware = require("../middleware/auth.middleware");
const listController = require('../modules/list/list.controller');

router.get('/get', [AuthMidelware.basic, listController.get]);
router.post('/add', [AuthMidelware.basic, listController.add]);
router.post('/update', [AuthMidelware.basic, listController.update]);
router.post('/delete', [AuthMidelware.basic, listController.delete]);

module.exports = router;