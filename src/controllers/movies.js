const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Movie = require('../models/Movie');

const OK = 200;
const CREATED = 201;

module.exports.getSavedMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    return res.status(OK).send(movies);
  } catch (error) {
    return next(error);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  try {
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    return res.status(CREATED).send(newMovie);
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteSavedMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;
  try {
    const selectedMovie = await Movie.findOne({
      _id: movieId,
      owner,
    })
      .orFail(() => new NotFoundError('Фильм по указанному id не найдена'));
    if (owner !== selectedMovie.owner.toString()) {
      throw new ForbiddenError('Нельзя удалить данный фильм');
    } else {
      await selectedMovie.deleteOne();
      return res.status(OK).send(selectedMovie);
    }
  } catch (error) {
    return next(error);
  }
};
