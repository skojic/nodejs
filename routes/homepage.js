const express = require('express');
const router = express.Router();

/**
 * Creating Homepage route
 */

router.get('/', (req, res) => {
  res.render('index', {title: 'Express App', message: 'Pug templating is working !!'});
});

module.exports = router;