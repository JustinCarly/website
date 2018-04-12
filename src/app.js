const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const dbConfig = config.get('DBHost');
const expressSanitizer = require('express-sanitizer');

const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (config.util.getEnv('NODE_ENV') !== 'test') {
	app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware to set variable for view if our project is in production environment or not
app.use((req, res, next) => {
	if (config.util.getEnv('NODE_ENV') === 'production') {
		res.locals.production = true;
	}
	next();
});


app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	if(err.link){
		res.redirect(err.link+'?errorMessage='+res.locals.message+'&errorStatus='+err.status+'&error='+res.locals.error);
	}
	else{ //Fall back if can't redirect error to same page.
		res.render('error', { title: "Error", errorMessage: res.locals.message, errorStatus: err.status, error: res.locals.error });
	}
});

module.exports = app;
