var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var config = require('config');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
let router = require('./routes/router');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'cmpe226',
    resave: false, //don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new MongoStore({
        url: config.mongoDBConfig.connectionStr,
        ttl: 24 * 60 * 60 // = 1 day
    })
}));

// set data and functions for templates
// account type: visitor = 0, dealer = 1, individual = 2
app.use(function(req, res, next) {
    res.locals.userInfo = req.session.user ? req.session.user : {};
    res.locals.accountType = req.session.accountType ? req.session.accountType : 0;
    res.locals.position = req.session.position ? req.session.position : {};
    next();
});

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
