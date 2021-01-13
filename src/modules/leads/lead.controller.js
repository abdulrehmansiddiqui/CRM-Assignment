const LeadService = require('./service/lead.service')

module.exports = {
    all(req, res, next) {
        LeadService
            .all(req.payload.user)
            .then(data => res.json(data))
            .catch(next)
    },
    add(req, res, next) {
        LeadService
            .add(
                req.payload.user,
                req.body,
            )
            .then(data => res.json(data))
            .catch(next)
    },
    update(req, res, next) {
        LeadService
            .update(
                req.payload.user,
                req.body,
            )
            .then(data => res.json(data))
            .catch(next)
    },
    delete(req, res, next) {
        LeadService
            .delete(
                req.payload.user,
                req.body.id,
            )
            .then(data => res.json(data))
            .catch(next)
    },
}