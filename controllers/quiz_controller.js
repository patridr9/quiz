var models = require('../models/models.js');

//autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
			}
		}).catch(function(error){ next(error);});
};

// Función para obtener el string a buscar en las preguntas
function convertirTextoABuscar(str) {
	str = str.replace(/ /g, '%');
	str = '%' + str + '%';	
	return str;              
}

// GET /quizes
exports.index = function(req, res) {
	if (req.query.search !== undefined) {
		models.Quiz.findAll({where: ["pregunta like ?", 
			convertirTextoABuscar(req.query.search)], order: "pregunta ASC"}).then(function(quizes) {
			res.render('quizes/index', {quizes: quizes});
		}
		).catch(function(error) { next(error);})
	} else {
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', {quizes: quizes});
		}
		).catch(function(error) { next(error);})
	}
};

//GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz: quiz });	
	});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		var resultado = 'Incorrecto';
		if (req.query.respuesta.toLowerCase() === quiz.respuesta.toLowerCase()){
			resultado = 'Correcto';	
		} 
		res.render('quizes/answer', {quiz: quiz, respuesta:  resultado });		
	});
};

exports.new = function(req, res) {
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new', {quiz: quiz});
};

exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz);
	//guarda en BD los campos del quiz
	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
		res.redirect('/quizes');	
	});
};