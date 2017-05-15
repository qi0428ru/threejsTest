/*
材质
1.基础材质：MeshBasicMaterial。这种材质不考虑光照的影响，使用这种材质的网格会被渲染
            成一些简单的平面多边形，而且你也有机会显示几何体的线框
*/
var $ = require('../../lib/jquery-1.9.0.js');
//var THREE = require('../../lib/three.js');
var MeshBasicMaterial = require('./MeshBasicMaterial.js');
var MeshDepthMaterial = require('./MeshDepthMaterial.js');
var MeshNormalMaterial = require('./MeshNormalMaterial.js');
var MeshFaceMaterial = require('./MeshFaceMaterial.js');
var HighMesh = require('./HighMesh.js');
var MaterialTest = {
   init: function(){
      //基础材质
      //MeshBasicMaterial.init();
      //深度着色+联合材质
      //MeshDepthMaterial.init();
      //法向颜色材质
      //MeshNormalMaterial.init();
      //为每个面指定材质
      //MeshFaceMaterial.init();
      //高级材料
      HighMesh.init();
   }
}
MaterialTest.init();



