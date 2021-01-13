const User = require("../user/user.model");

module.exports = {

    async reg(req, res, next) {
        let { email, password, name, phone } = req.body;

        console.log("Reg API")
        email.toLowerCase();

        if (password.length < 6) {
            return res.status(422).send({
                name: "password",
                message: "Minimum password length is 6"
            })
        }

        if (password.length > 16) {
            return res.status(422).send({
                name: "password",
                message: "Maximum password length is 16"
            })
        }

        User.findOne({ email: { $regex: new RegExp(`^${email.trim()}$`, "i") } })
            .then(async item => {
                if (item) {
                    return res.status(201).send({
                        status: false,
                        name: "email",
                        message: "This email is already busy"
                    })
                } else {
                    const user = new User({ email, name, password, phone, role: 1 });
                    let userDoc = await user.save()
                    // console.log("xxxxxxxx", userDoc)

                    res.json({ status: true, auth: user.generateJWT(), id: userDoc._id, role: 1, });
                }
            })
            .catch(next);
    },

    login(req, res, next) {
        const { email, password } = req.body;
        console.log("Login API")

        User.findOne({ email: { $regex: new RegExp("^" + email + "$", "i") } })
            .then(user => {
                if (!user) {
                    return res.status(422).send({ message: "this email don't registration" })
                }
                if (user === null) {
                    return res.status(422).send({ message: "Wrong password or login" })
                }
                else {
                    if (user && user.validatePassword(password)) {
                        res.json({
                            role: 1,
                            auth: user.generateJWT(),
                            id: user._id
                        });
                    } else {
                        return res.status(422).send({ message: "Wrong password or login" })
                    }
                }
            })
            .catch(next);
    },



};
