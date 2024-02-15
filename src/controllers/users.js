const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../utils/constants');
const User = require('../models/User');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const OK = 200;
const CREATED = 201;

const SALT_ROUNDS = 10;

module.exports.getUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    return res.status(OK).send(user);
  } catch (error) {
    return next(error);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      owner,
      { name, email },
      { new: true, runValidators: true },
    )
      .orFail(() => new NotFoundError('Пользователь по указанному id не найден'));
    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password')
      .orFail(() => new UnauthorizedError('Неправильные почта или пароль'));
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    return res
      .status(OK)
      .send({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      name,
      email,
      password: hash,
    });
    return res.status(CREATED).send({
      data: {
        email: newUser.email,
        name: newUser.name,
        _id: newUser._id,
      },
    });
  } catch (error) {
    return next(error);
  }
};
