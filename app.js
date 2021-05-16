var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser')

// database
var database = require('./database')

var routes = require('./routes/index'),
    users = require('./routes/users')


var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
// app.use('/users', users)


var db = {
    host : 'localhost',
    port : 27017,
    dbname : 'myproject',
    collectionName : 'plants'
}
// Connect to Mongo on start
database.connect('mongodb://'+ db.host +':'+ db.port +'/'+ db.dbname, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})
//*

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})


// error handlers // will print stacktrace

 // development error handler
if (app.get('env') === 'development') {
  app.locals.pretty = true
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

 // production error handler // no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// module.exports = app
//
// app.listen(3000);

//*/
