const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const key = require('../../../key');

const User = new mongoose.Schema({
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
    },
    phone: {
        type: Number,
        // required: true
    },
},
);



User.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next()
        })

    })

})


User.methods.validatePassword = function (password) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
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


User.methods.generateJWT = function () {
    return jwt.sign(
        {
            id: this._id,
        },
        key.jwtkey,
    );
};

User.methods.toAuthJSON = function () {
    return {
        id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};


module.exports = mongoose.model("User", User);
