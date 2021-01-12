const jwt = require('jsonwebtoken');
const User = require('../modules/user/user.model');
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

        const user = await User.findOne({ _id: decoded.id, });

        if (user) {
            req.payload.user = user;
            next();
        } else {
            return res.status(401).send('Unauthorized')
        }

    } catch (err) {
        next(err);
    }

};
