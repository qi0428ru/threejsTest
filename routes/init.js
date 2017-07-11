'use strict';

var index = require('./page/index');
var chapter02 = require('./page/chapter02');
var chapter03 = require('./page/chapter03');
var chapter04 = require('./page/chapter04');
var chapter05 = require('./page/chapter05');
var chapter06 = require('./page/chapter06');
var chapter07 = require('./page/chapter07');
var chapter08 = require('./page/chapter08');
var chapter09 = require('./page/chapter09');
var collada = require('./page/collada');
var twentyth = require('./page/20th');
var whs = require('./page/whs');



module.exports = function(express, app) {

   app.use('/', index);
   app.use('/chapter02', chapter02);
   app.use('/chapter03', chapter03);
   app.use('/chapter04', chapter04);
   app.use('/chapter05', chapter05);
   app.use('/chapter06', chapter06);
   app.use('/chapter07', chapter07);
   app.use('/chapter08', chapter08);
   app.use('/chapter09', chapter09);
   app.use('/collada', collada);
   app.use('/20th', twentyth);
   app.use('/whs', whs);

};