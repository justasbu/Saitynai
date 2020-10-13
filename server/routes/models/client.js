const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({

    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number,
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true}

});

module.exports = mongoose.model('Client', clientSchema);