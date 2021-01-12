const jwt = require('jsonwebtoken');
const Admin = require('../modules/admin/admin.model');
const key = require('../../key');

module.exports.basic = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized')
    } else {
      var auth = req.headers.authorization.split(' ')[1];
    }

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(auth, key.jwtkey, function (err, decoded) {
        if (err) {
          reject(err)
        } else {
          resolve(decoded);
        }
      });
    }).catch(err => {
      return res.status(401).send('Bad token')
    });

    const admin = await Admin.findOne({ _id: decoded.id, });
    if (admin) {
      req.payload.user = admin;
      next();
    } else {
      return res.status(401).send('Unauthorized')
    }

  } catch (err) {
    next(err);
  }

};
