const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    amount: { type: Number, required: true},

});

module.exports = mongoose.model('Payment', paymentSchema);