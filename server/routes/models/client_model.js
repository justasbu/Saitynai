const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Provider = require('./providers')

const schemaClient = new Schema({
    name: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [25, ' Too long name'],
      required: [true, ' Name is required'],
      unique: true
    },
    email: {
      type: String,
      minlength:[6, ' Too short email'],
      maxlength: [25, ' Too long email'],
      required: [true, ' Email is required'],
      validate: {
        validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: ' Not a valid email'
      }
    },
    providers: [{type: Schema.Types.ObjectId, ref: 'Provider'}]
},
{versionKey: false});

module.exports = mongoose.model('Client', schemaClient);