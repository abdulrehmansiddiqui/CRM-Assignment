// const File = require("../../../modules/file/file.model");
// const jimp = require("jimp");
// const crypto = require("crypto");
const User = require("../user.model");

module.exports = {


  async updateUser(user, data) {
    // let password = data.password;
    let phone = data.phone;
    let email = data.email;
    let name = data.name;
    let id = data.id ? data.id : user._id;

    let message = {
      email: false,
      password: false,
      name: false,
      phone: false
    };

    if (email) {
      await User.findOneAndUpdate(
        { _id: id },
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
        { _id: id },
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
        { _id: id },
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


    return message;
  },


  async delete(user, data) {

    let id = data.id ? data.id : user._id;
    const user = user.user

    await User.findOneAndUpdate({ _id: id }, { $set: { accountActive: 2, verified: false } })

    return "updated"
  }


};
