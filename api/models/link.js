const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    NIN: { type: String, required: true, unique: true},

});

module.exports = mongoose.model('Link', linkSchema);