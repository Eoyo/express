var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var reg = {
  virjs:/.*\.vir$/
  ,getName : /(\w*)\.vir$/
  ,jsFile: /(\w*)\.js$/
  ,getJsFile(str){
    var onep = reg.jsFile.exec(str);
    if(onep) return onep[1];
    else{
      return onep;
    }
  }
}

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(reg.virjs,function(req,res,next){
  console.log("get js");
  var name = reg.getName.exec(req.originalUrl)[1];
  console.log(name);
  res.send(model.html({
    js:name + ".js"
  }));
})
app.use(express.static(path.join(__dirname, 'public')));
// var wCompute = require("./compute");
// var vk = wCompute.getMessage({
//   data:{
//     input:"x+1"
//     ,id :0
//     ,compute:"text"
//   }
// })
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
var model = {
  js:[]
  ,css:[]
  ,vir:"../Vir/Vir.js"
  ,html(op={js:"",css:""}) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=750, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Vir.js</title>
      <link rel="stylesheet" href="../css/base.css">
  </head>
  <body>
      <script src = "${model.vir}"></script>
      <script src = "${op.js}"></script>
  </body>
  </html>`;
  }
  ,errorjs404(js){
    return `Vir.addError("${js}.js can't find",404)`
  }
}

// console.log(vk);
app.use('/', index);
app.use('/users', users);
// app.get('/compute', function (req, res) {
//   // console.log(req.originalUrl);
//   var rus = wCompute.getMessage({
//     data:{
//       input:req.query.input
//       ,id :0
//       ,compute:"text"
//     }
//   })
//   res.send (rus);
// })


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
  var jsName = reg.getJsFile(req.originalUrl);
  if(jsName){
    res.status( 200 );
    res.send(model.errorjs404(jsName));
  }else{
    res.render('error');
  }
});
module.exports = app;
console.log(typeof app);
/**
 * 
 * npm install node-sass 会出错;
 * 用cnpm
 * 成功安装的顺序:
 * npm update
 * npm install
 * cnpm install
 * //cnpm 只解决了一些npm的问题,只是cnpm 也有问题的
 * 
 * 
 * 2017 9 17 
 * app is a function;
 * 
 * 2017 
 *  9 18
 *  统一前后端:动态的模块导入,js代码前后端都可以跑;
 *  seo适应的方案:直接使用url访问时js文件是渲染文件;之后的一面切换采用传json,or直接js;
 *  
  //cnpm 目录结构貌似有问题
  ,
    "devDependencies": {
      "gulp": "^3.9.1",
      "gulp-livereload": "^3.8.1",
      "gulp-sass": "^3.1.0", //!!xx
      "gulp-uglify": "^3.0.0"
    }
  
 */