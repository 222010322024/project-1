const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const helment = require('helmet');
const app = express();

// Middlware
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helment());

// Routes
app.use('/api/v1/user', require('./routes/User'));
app.use('/api/v1/images', require('./routes/Image'));

module.exports = app;
