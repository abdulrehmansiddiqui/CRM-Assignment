const List = require("./list.model");

module.exports = {

    async get(user) {
        console.log("Get List API HIT")

        let datatosend = await List.find({}).then(data => {
            return { message: "successfully", data }
        }).catch(err => {
            return { err: "error found", err }
        })

        return datatosend

    },

    async add(user, message) {
        console.log("add List API HIT")

        const list = new List({ user: user._id, message });
        let datatosend = await list.save().then(data => {
            return data
        }).catch(err => {
            return { err: "error found", err }
        })
        return datatosend

    },

    async update(user, id, message,) {
        console.log("Update List API HIT")

        let data = await List.findOneAndUpdate({ _id: id }, { $set: { message } }, { new: true })
        return { message: "successfully Update", data }

    },

    async delete(user, id) {
        console.log("delete List API HIT")

        let datatosend = await List.findOneAndRemove({ _id: id }).then(data => {
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
