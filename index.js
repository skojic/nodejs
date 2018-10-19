/**
 * Importing node modules
 */
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const app = express();
const courses = require('./routes/courses');
const homepage = require('./routes/homepage');

app.set('view engine', 'pug');
app.set('views', './views'); // default templating folder

/**
 * Middleware
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', homepage);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

app.use(logger);

/**
 * Enviromental PORT variable
 * @param {Enviromental} port
 * @returns {Enviromental} export PORT=port on productional machine
 */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));