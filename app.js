var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var wCompute = require("./compute");
var vk = wCompute.getMessage({
  data:{
    input:"x+1"
    ,id :0
    ,compute:"text"
  }
})
var Url = {
  read(str=""){
    var start = str.indexOf('?');
    var queryStr = str.slice(start+1,str.length);
    var obj = {}
    queryStr.split("&")
      .forEach(function (v){
        var keys = v.split("=");
        obj[decodeURI (keys[0])] = decodeURI ( keys[1]); 
    })
    console.log(obj);
    return obj;
  }
}

console.log(vk);
app.use('/', index);
app.use('/users', users);
app.get('/compute', function (req, res) {
  // console.log(req.originalUrl);
  var rus = wCompute.getMessage({
    data:{
      input:req.query.input
      ,id :0
      ,compute:"text"
    }
  })
  res.send (rus);
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

module.exports = app;
