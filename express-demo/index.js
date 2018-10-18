/**
 * Importing node modules
 */

const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

/**
 * Array of courses
 * @param {array} courses
 */

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
];

/**
 * Creating GET route
 * @returns {string}
 */

app.get('/', (req, res) => {
  res.send('Basic Route Response.');
});

/**
 * Creeating GET route
 * @returns {array} courses
 */

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

/**
 * Creating POST route for creating new course
 * @param {array} course
 */

app.post('/api/courses', (req, res) => {
  const {error} = validateCourse(req.body);  
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

/**
 * Creating PUT route for updating courses
 */

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found.')
  const {error} = validateCourse(req.body);  
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

/**
 * Validation function
 * @param {array} course
 */

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

/**
 * Creating GET route for specific course
 */

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found.')
  res.send(course);
});

/**
 * Enviromental PORT variable
 * @param {Enviromental} port
 * @returns {Enviromental} export PORT=port on productional machine
 */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


