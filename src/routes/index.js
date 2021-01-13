const router = require('express').Router();

router.use('/admin', require('./admin.router'));
router.use('/auth', require('./auth.router'));
router.use('/user', require('./user.router'));
router.use('/lead', require('./lead.router'));

module.exports = router;