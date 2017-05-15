var express = require('express');
var path = require('path');
var ejs = require('ejs');
var app = express();

var env = process.env.NODE_ENV || 'development';

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', '.html');
// 初始化路由
require('./routes/init')(express, app);

//重要！！！涉及到页面中引入文件的书写方式
//设置public文件夹为存放静态文件的目录。
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3006, function() {
  console.log('Express server listening on port 3006');
});

module.exports = app;
