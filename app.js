var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./config/dbConfig.js');
const mongoose = require('mongoose');
mongoose.connect(config.db,{useNewUrlParser: true}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
// controllers...
var indexController = require('./controllers/indexController');
var usersController = require('./controllers/usersController');
var contactusController = require('./controllers/contactusController');
var blogController = require('./controllers/blogController');
var restApisController = require('./controllers/rest-apisController');
// rest controllers...
var blogRestController = require('./restControllers/blogController');
var profileRestController = require('./restControllers/profileController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexController);
app.use('/users', usersController);
app.use('/contactus', contactusController);
app.use('/blog', blogController);
app.use('/rest-apis', restApisController);

// rest....
app.use('/rest/blog', blogRestController);
app.use('/rest/profile', profileRestController);

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