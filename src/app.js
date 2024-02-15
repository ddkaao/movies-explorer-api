const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/main');
const { error } = require('./middlewares/error');

const app = express();
app.use(cors());

const PORT = 3000;
const URI = 'mongodb://127.0.0.1:27017/bitfilmsdb';

mongoose.connect(URI);

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use('/', error);

app.listen(PORT);
