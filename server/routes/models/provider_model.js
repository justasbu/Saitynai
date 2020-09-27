const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaProvider = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
    }

},
    {versionKey: false});

module.exports = mongoose.model('Provider',schemaProvider);