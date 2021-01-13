const mongoose = require('mongoose');

const lead = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },//User ID
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        updateat: {
            type: Date,
            default: Date.now
        },


    }
);

module.exports = mongoose.model('lead', lead);