const ListService = require('../../modules/list/list.service')

module.exports = {
    get(req, res, next) {
        ListService
            .get(req.payload.user)
            .then(data => res.json(data))
            .catch(next)
    },
    add(req, res, next) {
        ListService
            .add(
                req.payload.user,
                req.body.message,
            )
            .then(data => res.json(data))
            .catch(next)
    },
    update(req, res, next) {
        ListService
            .update(
                req.payload.user,
                req.body.id,
                req.body.message,
            )
            .then(data => res.json(data))
            .catch(next)
    },
    delete(req, res, next) {
        ListService
            .delete(
                req.payload.user,
                req.body.id,
            )
            .then(data => res.json(data))
            .catch(next)
    },
}