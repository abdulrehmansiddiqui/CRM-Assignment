const router = require('express').Router();

router.use('/auth', require('./auth.router'));
router.use('/user', require('./user.router'));
// router.use('/list', require('./list.router'));

module.exports = router;