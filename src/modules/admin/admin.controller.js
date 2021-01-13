// const AdminService = require('./services/admin.service');
const Admin = require("./admin.model");
const User = require("../user/user.model");

module.exports = {
  async reg(req, res, next) {
    let { email, password, name } = req.body;

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

    Admin.findOne({ email: { $regex: new RegExp(`^${email.trim()}$`, "i") } })
      .then(async item => {
        if (item) {
          return res.status(422).send({
            name: "email",
            message: "This email is already busy"
          })
        } else {
          const admin = new Admin({ email, name, password, role: 2 });
          let adminDoc = await admin.save()

          res.json({ auth: admin.generateJWT(), id: adminDoc._id, role: 2  });
        }
      })
      .catch(next);
  },

  login(req, res, next) {
    const { email, password } = req.body;

    Admin.findOne({ email: { $regex: new RegExp("^" + email + "$", "i") } })
      .then(admin => {
        if (!admin) {
          return res.status(422).send({ message: "this email don't registration" })
        }
        if (admin === null) {
          return res.status(422).send({ message: "Wrong password or login" })
        }
        else {
          if (admin && admin.validatePassword(password)) {
            res.json({
              role: 2,
              auth: admin.generateJWT(),
              id: admin._id
            });
          } else {
            return res.status(422).send({ message: "Wrong password or login" })
          }
        }
      })
      .catch(next);
  },

  userInfo(req, res, next) {
    res.json(req.payload.user);
  },

  async singleUser(req, res, next) {

    const { userid, status } = req.body;

    let singleUser
    singleUser = await User.findOne({ _id: userid });

    if (singleUser) {
      return res.status(200).send({ msg: "User Successfully", data: singleUser })
    }
    else {
      return res.status(200).send({ msg: "No User Found" })
    }

  },

  async updateUser(req, res, next) {
    const { email, phone, name, userid } = req.body;

    let message = {
      email: false,
      name: false,
      phone: false
    };

    if (email) {
      await User.findOneAndUpdate(
        { _id: userid },
        { $set: { email } },
        {
          new: true
        }
      ).then(result => {
        if (result) {
          message.email = 'Email is update';
        } else {
          message.email = false;
        }
      });
    }

    if (name) {
      await User.findOneAndUpdate(
        { _id: userid },
        { $set: { name } },
        {
          new: true
        }
      )
        .then(result => {
          if (result) {
            message.name = "name is update";
          } else {
            message.name = false;
          }
        })
    }

    if (phone) {
      await User.findOneAndUpdate(
        { _id: userid },
        { $set: { phone } },
        {
          new: true
        }
      )
        .then(result => {
          if (result) {
            message.phone = "phone is update";
          } else {
            message.phone = false;
          }
        })
    }

    return res.status(200).send({ msg: "Update User Successfully", message })
  },

  async allUsers(req, res, next) {
    try {
      let allUsers = await User.find({}, { salt: 0, hash: 0 }).sort({ createdAt: -1 })

      if (allUsers.length > 0) {
        return res.status(200).send({ msg: "Get All the Users Successfully", data: allUsers })
      }
      else {
        return res.status(300).send({ msg: "No Users Found", data: [] })
      }
    }
    catch (e) {
      return res.status(422).send({ msg: "Error Found User Worng ID", err: e })
    }
  },

  async deleteUser(req, res, next) {

    try {
      const { userid } = req.body;

      await User.findOneAndDelete({ _id: userid })

      return res.status(200).send({ status: true, msg: "This user and there data is removed" })
    }
    catch (e) {
      return res.status(422).send({ status: false, msg: "Error Found User Worng ID", err: e })
    }
  },

  // async verifyUser(req, res, next) {
  //   try {

  //     const { userid, status } = req.body;

  //     user = await User.findOneAndUpdate({ _id: userid }, { $set: { verified: status } })

  //     if (user) {
  //       return res.status(200).send({ msg: "This user is now verified" })
  //     }
  //     else {
  //       return res.status(300).send({ msg: "No Users Found" })
  //     }
  //   }
  //   catch (e) {
  //     return res.status(422).send({ msg: "Error to verified user", err: e })
  //   }
  // },

  // async blockUser(req, res, next) {
  //   console.log("BLOCK USER")
  //   try {
  //     const { userid, status } = req.body;

  //     user = await User.findOneAndUpdate({ _id: userid }, { $set: { accountActive: status } })

  //     var msg = "User has been unblock"
  //     if (status) {
  //       msg = "User has been Block"
  //     }

  //     if (user) {
  //       return res.status(200).send({ status: true, msg })
  //     }
  //     else {
  //       return res.status(300).send({ status: false, msg: "No Users Found", })
  //     }
  //   }
  //   catch (e) {
  //     return res.status(422).send({ status: false, msg: "Error Found User Worng ID", err: e })
  //   }
  // },



}