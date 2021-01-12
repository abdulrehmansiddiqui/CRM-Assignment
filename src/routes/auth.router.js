const router = require("express").Router();
const AuthController = require("../modules/auth/auth.controller");
// const AuthMidelware = require("../middleware/auth.middleware");

router.post('/reg', AuthController.reg);
router.post('/login', AuthController.login);
// router.post('/delete', [AuthMidelware.basic, DeleteAuthController.delete])

module.exports = router;