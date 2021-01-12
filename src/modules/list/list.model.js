const mongoose = require('mongoose');

const list = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },//User ID
        message: { type: String, },
        created: { type: Date, default: Date.now },
        updateat: { type: Date, default: Date.now },

    }
);

module.exports = mongoose.model('lists', list);