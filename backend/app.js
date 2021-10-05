var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mysql = require('mysql');
const { json } = require('express');


//SQL Connections
var connection = mysql.createConnection({
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
connection.connect(function (err) {
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

//User API Calls

//login
app.post('/api/users/login',express.json(), function(req, res) {
	var user = req.body.user;
	console.log('before query')
	console.log(user)
	connection.query('select * from pwa_crud.users where users.userid = "' + user.userid + '" AND users.password = "' + user.password + '"',
	user,
	function (err, rows) {
		if (err) throw err;
		let json_rows = JSON.parse(JSON.stringify(rows))
		console.log(json_rows)
		if (json_rows.length != 0) {
			res.send('success')
		}
		else {
			res.send('failure')
		}
	});
})


//sign Up
app.post('/api/users/signUp', express.json(), function (req, res) {
	var user = req.body.user;


	connection.query('select * from pwa_crud.users where users.userid = ?',
	[user.userid], function (err, rows) {
		if (err) throw err;
		let json_rows = JSON.parse(JSON.stringify(rows))
		console.log(json_rows)
		if (json_rows.length == 0) {
			connection.query('INSERT INTO users (userid,name,password) VALUES ("' + user.userid + '","' + user.name + '","' + user.password + '")', 
			user,
			function (err, result) {
				if (err) {
					console.error(err);
					throw err;
				}
				console.log(result)
			});
			res.send('success')
		}
		else {
			res.send('failure')
		}
	})
});

//VueGraph API Calls

app.get('/api/mob_ae', function (req, res) {
	connection.query('SELECT ri FROM mobiusdb.ae', function (err, rows) {
		if (err) throw err;
		let result = JSON.parse(JSON.stringify(rows))
		res.send(result);
	});
});

app.get('/api/mob_cnt', function (req, res) {
	connection.query('SELECT ri FROM mobiusdb.cnt', function (err, rows) {
		if (err) throw err;
		let result = JSON.parse(JSON.stringify(rows))
		res.send(result);
	});
});

//UserList API calls
app.get('/api/users', function (req, res) {
	connection.query('SELECT userid, name from pwa_crud.users', function(err, rows) {
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
app.use(express.urlencoded());
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
