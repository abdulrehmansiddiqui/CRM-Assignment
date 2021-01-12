const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const key = require('../../../key');

const Admin = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
);



Admin.pre('save', function (next) {
    const admin = this;
    if (!admin.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(admin.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            admin.password = hash;
            next()
        })

    })

})


Admin.methods.validatePassword = function (password) {
    const admin = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if (!isMatch) {
                return reject(err)
            }
            resolve(true)
        })
    })
};


Admin.methods.generateJWT = function () {
    return jwt.sign(
        {
            id: this._id,
        },
        key.jwtkey,
    );
};

Admin.methods.toAuthJSON = function () {
    return {
        id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};


module.exports = mongoose.model("Admin", Admin);
