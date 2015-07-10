var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//autoload de comandos con quizId
router.param('quizId', quizController.load);

//Deficion de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes?search=:textSearch(\\*)', quizController.search);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author',  function(req, res) {
  res.render('author', { author: 'Patri Dopico' });
});

module.exports = router;
