const express = require('express');
const router = express.Router();

/**
 * Array of courses
 * @param {array} courses
 */

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
];

/* Creeating GET route
* @returns {array} courses
*/

router.get('/', (req, res) => {
 res.send(courses);
});

/**
* Creating POST route for creating new course
* @param {array} course
*/

router.post('/', (req, res) => {
 const {error} = validateCourse(req.body);  
 if (error) return res.status(400).send(error.details[0].message);
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

router.put('/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if (!course) return res.status(404).send('The course with the given ID was not found.')

 const {error} = validateCourse(req.body);  
 if (error) return res.status(400).send(error.details[0].message);
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

router.get('/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if (!course) return res.status(404).send('The course with the given ID was not found.')
 res.send(course);
});

/**
* Creating DELETE route
*/

router.delete('/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if (!course) return res.status(404).send('The course with the given ID was not found.')
 const index = courses.indexOf(course);
 courses.splice(index, 1);
 res.send(course);
});

module.exports = router;
