const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    quantity: {type: Number, default: 1},
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true}

});

module.exports = mongoose.model('Order', orderSchema);