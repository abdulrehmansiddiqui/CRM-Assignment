const allusersSrvice = require('./service/userService')

module.exports = {
  userInfo(req, res, next) {
    res.json(req.payload.user);
  },

  updateUser(req, res, next) {
    allusersSrvice
      .updateUser(req.payload.user, req.body)
      .then(data => { res.json(data) })
      .catch(next)
  },
  deleteUser(req, res, next) {
    allusersSrvice
      .deleteUser(req.payload.user, req.body)
      .then(data => { res.json(data) })
      .catch(next)
  },

};
