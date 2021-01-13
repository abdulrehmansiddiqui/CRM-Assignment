const Lead = require("../lead.model");

module.exports = {

    async all(user) {
        console.log("Get all Lead API HIT")

        let datatosend = await Lead.find({ user: user._id }).then(data => {
            return { message: "successfully", data }
        }).catch(err => {
            return { err: "error found", err }
        })

        return datatosend

    },

    async add(user, data) {
        console.log("add Lead API HIT", user._id)

        let _id = user._id
        let name = data.name
        let email = data.email
        let phone = data.phone

        const lead = new Lead({ user: user._id, name, phone, email });
        let datatosend = await lead.save().then(data => {
            return data
        }).catch(err => {
            return { err: "error found", err }
        })
        return datatosend

    },

    async update(user, data) {
        console.log("Update Lead API HIT")

        let _id = data.id
        let name = data.name
        let email = data.email
        let phone = data.phone

        let respo = await Lead.findOneAndUpdate({ _id }, { $set: { name, email, phone } }, { new: true })
        return { message: "successfully Update", respo }

    },

    async delete(user, id) {
        console.log("delete Lead API HIT")

        let datatosend = await Lead.findOneAndRemove({ _id: id }).then(data => {
            if (data !== null) {
                return { message: "successfully Delete" }
            } else {
                return { message: "NOT FOUND" }
            }
        }).catch(err => {
            return { err: "error found", err }
        })
        return datatosend
    },


};
