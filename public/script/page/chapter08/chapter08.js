
var $ = require('../../lib/jquery-1.9.0.js');
var MergeMesh = require('./MergeMesh.js');
var LoadMesh = require('./LoadMesh.js');
var SuperGeometry = {
   init: function(){
      //几何体合并
      //MergeMesh.init();

      LoadMesh.init();
   }
}
SuperGeometry.init();