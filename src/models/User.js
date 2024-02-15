const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (e) => validator.isEmail(e),
        message: 'Неверный электронный адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
