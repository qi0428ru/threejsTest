var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var $ = require('gulp-load-plugins')();
var colors = require('colors');
var runSequence = require('run-sequence');
var through = require('through2');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var spritesmith = require('gulp.spritesmith');
var del = require('del');
var gulpif = require('gulp-if');
var beautify = require('gulp-beautify');
var less = require('gulp-less');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var size = require('gulp-size');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var print = require('gulp-print');
var replace = require('gulp-replace');
var prefix = require('gulp-prefix');
var Ftp = require('ftp');
var Pem = require('pem');
var slash = require('slash');
var debug = require('gulp-debug');
var cmdModule = require('./gulp/lib/cmdModule')();
var UglifyJS = require('uglify-js');
var server = require('gulp-express');
// var merge = require('merge-stream');
var packageJson = require('./package.json');
var CONFIG = {
   isDebug: false,
   isPreview: false,
   isDeploy: false
};

var projectDirPath = packageJson.sftp.dirPath + packageJson.project + '/';

var cdnPath = packageJson.cdnDomain + projectDirPath;

console.log('cdnPath = ' + cdnPath);

gulp.task('sprite', function(cb) {
   var spriteOptions = require('./gulp/options/sprites')();
   var item = {}, spriteData = null;
   Object.keys(spriteOptions).map(function(key, index) {
      item = spriteOptions[key];
      // console.log('------------------------------------------------');
      //console.log(item);
      spriteData = gulp.src(item.src)
                       .pipe(spritesmith(item))
                       .pipe(gulp.dest('./'));
   });

   return spriteData;
});

var AUTOPREFIXER_BROWSERS = [
   'ie >= 6',
   'ie_mob >= 6',
   'ff >= 30',
   'chrome >= 34',
   'safari >= 7',
   'opera >= 23',
   'ios >= 7',
   'android >= 4.4',
   'bb >= 10'
];

gulp.task('less', function() {
   return gulp.src('./public/less/**/*.less')
               .pipe(less({
                  modifyVars: {
                     // 'imgPath': '"/image"'
                  }
               }))
               // .pipe(sourcemaps.init())
               .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
               // .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest('./public/style'))
               .pipe(connect.reload());
});

gulp.task('webpack', function() {
   return gulp.src('./public/script/page/**/*.js')
              .pipe(named())
              .pipe(webpack(require('./webpack.config.js')))
              .pipe(gulp.dest('./public/script/dest/page/'))
              .pipe(connect.reload());
});

gulp.task('watch', function () {
   gulp.watch('./public/less/**/*.less', ['less']);

   gulp.watch(['./public/script/**/*.@(js|handlebars)', '!./public/script/dest/**/*.js'], ['webpack']);
});

gulp.task('webserver:dev', function() {
   var options = {};
   server.run(['bin/www'], options);
});

gulp.task('clean', function (cb) {
   return del([
      './public/image/sprites/**',
      './public/less/sprite/**',
      './public/style/**',
      './public/script/dest/**'
   ], {force: true}, cb);
});

gulp.task('dev', function (done) {
   CONFIG['isDebug'] = true;
   runSequence(
      'clean',
      'sprite',
      'less',
      'webserver:dev',
      'webpack',
      'watch',
   done);
});
gulp.task('default', function() {
   // 将你的默认的任务代码放在这
   console.log('default task');
});