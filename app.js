var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();


var mongoose = require('mongoose');
var db = "mongodb+srv://thanhvinh:123@my-cluster.2d9yo.mongodb.net/cloud"; 
mongoose.connect(db)
    .then(() => console.log('Connected to database successfully!'))
    .catch(err => console.error('Failed to connect to database: ' + err));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'Vinh',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use 'true' only if you're on HTTPS
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
var indexRouter = require('./routes/index');
var bookRouter = require('./routes/book'); //

app.use('/', indexRouter);
app.use('/book', bookRouter);

// 
app.use(function(req, res, next) {
  next(createError(404));
});

// 
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.render('error');
});

// 
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});

module.exports = app;
