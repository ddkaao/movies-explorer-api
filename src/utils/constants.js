const { MONGODB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;

const REGEX_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

module.exports = {
  MONGODB_URL,
  NODE_ENV,
  JWT_SECRET,
  REGEX_URL,
};
