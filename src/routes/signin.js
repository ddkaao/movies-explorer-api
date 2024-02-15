const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
