var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
					{ dialect: "sqlite", storage: "quiz.sqlite"}
				);

//Importar la defincion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; //Exportar defincion tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en BD
sequelize.sync().success(function(){
	Quiz.count().success(function (count){
		if (count === 0) {
			Quiz.create({ 
						pregunta: 'Capital de Italia',
						respuesta: 'Roma'
			})
			.success(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});