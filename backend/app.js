var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mysql = require('mysql');


//SQL Connections
var crud_connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'idb1004#',
	database: 'pwa_crud'
});
var mob_db_connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'idb1004#',
	database: 'mobiusdb'
})

//Connect Connections
crud_connection.connect(function (err) {
	if (err) {
		console.error('mysql pwa_crud connection error');
		console.error(err);
		throw err;
	}
});

mob_db_connection.connect(function (err) {
	if (err) {
		console.error('mysql mobiusdb connection error');
		console.error(err);
		throw err;
	}
})

// MySQL REST API Calls

//Login / User API Calls
app.post('/api/users/signUp', function (req, res) {
	var user = {
		'userid': req.body.userid,
		'name': req.body.name,
		'password': req.body.password
	};
	var query = crud_connection.query('insert into user set ? ', user, function (err, result) {
		if (err) {
			console.error(err);
			throw err;
		}
		res.status(200).send('success');
	});
});

app.post('/api/users/login', function (req, res) {
	var user = {
		'userid': req.body.userid,
		'password': req.body.password
	};
	var query = crud_connection.query('select password from pwa_crud.users where id = user.userid', user, function (err, result) {
		if (err) {
			console.error(err);
			throw err;
		}
		
	});
});

//VueGraph API Calls

app.get('/api/mob_ae', function (req, res) {
	mob_db_connection.query('SELECT ri FROM mobiusdb.ae', function (err, rows) {
		if (err) throw err;
		let result = JSON.parse(JSON.stringify(rows))
		res.send(result);
	});
});

app.get('/api/mob_cnt', function (req, res) {
	mob_db_connection.query('SELECT ri FROM mobiusdb.cnt', function (err, rows) {
		if (err) throw err;
		let result = JSON.parse(JSON.stringify(rows))
		res.send(result);
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
