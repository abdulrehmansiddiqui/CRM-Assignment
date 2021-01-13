const router = require("express").Router();
const LeadController = require("../modules/leads/lead.controller");
const AuthMidelware = require('../middleware/auth.middleware');

router.get('/',                 [AuthMidelware.basic, LeadController.all]);
router.post('/add',             [AuthMidelware.basic, LeadController.add]);
router.post('/update',          [AuthMidelware.basic, LeadController.update]);
router.post('/delete',          [AuthMidelware.basic, LeadController.delete]);



module.exports = router;
