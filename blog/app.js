var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
// var users = require('./routes/users');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express(); //生成一个express实例 app

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('view engine', 'ejs');//设置视图模板引擎为 ejs

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));设置/public/favicon.ico为favicon图标。
app.use(logger('dev')); //加载日志中间件。
app.use(bodyParser.json()); //加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false })); //加载解析urlencoded请求体的中间件。
app.use(cookieParser()); //加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));  //设置public文件夹为存放静态文件的目录。


app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));
// app.use('/', routes);
// app.use('/users', users);

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace

// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


// module.exports = app;
