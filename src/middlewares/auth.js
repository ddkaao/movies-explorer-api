const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;
    if (!authorization.startsWith('Bearer')) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const token = authorization.split('Bearer ')[1];
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
