const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSavedMovies,
  createMovie,
  deleteSavedMovie,
} = require('../controllers/movies');
const { REGEX_URL } = require('../utils/constants');

router.get('/', getSavedMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEX_URL),
    trailerLink: Joi.string().required().regex(REGEX_URL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(REGEX_URL),
    movieId: Joi.string().hex().length(24),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteSavedMovie);

module.exports = router;
