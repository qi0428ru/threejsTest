
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');

var MergeMesh = {
   init: function(){
      this.grouping = true;
      this.initScene();
      this.initCamera();
      this.initRenderer();
      //this.createLessMergeGeometry();//对象组合
      this.createManyMergeGeometry();//将多个网格合并成一个网格
      this.render();
      this.bindEvent();
   },
   initScene: function(){
      this.scene = new Three.Scene();
   },
   initCamera: function(){
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera.position.x = 30;
      this.camera.position.y = 30;
      this.camera.position.z = 30;
      this.camera.lookAt(new Three.Vector3(0, 0, 0));
   },
   initRenderer: function(){
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setClearColor(new Three.Color(0xEEEEEE, 1.0));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMapEnabled = true;
      $('#WebGL-output').append(this.renderer.domElement);
   },
   bindEvent: function(){
      $('.js-changeRotation').on('click', $.proxy(this.changeRotation, this));
   },
/*********************************************************/
   createLessMergeGeometry: function(){
      this.initGround();//创建平面
      this.createGroup();//创建组
      this.createArrow();//创建箭头
   },
   changeRotation: function(){
      var self = this;
      if(self.grouping){
         self.grouping = false;
      }else{
         self.grouping = true;
      }
   },
   initGround: function(){
      var groundGeom = new Three.PlaneGeometry(100, 100, 50, 50);
      var material1 = new Three.MeshBasicMaterial({wireframe: true, overdraw: true, color: 000000});
      var material2 = new Three.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.5});
      this.groundMesh = new Three.SceneUtils.createMultiMaterialObject(groundGeom, [material1, material2]);
      this.groundMesh.rotation.x = -0.5 * Math.PI
      this.scene.add(this.groundMesh);
   },
   createGroup: function(){
      var self = this;
      this.group = new Three.Group();//Object3D()也一样。与Group()的区别？
      this.group.position.set(10, 5, 0);
      var sphereGeom = new Three.SphereGeometry(5, 10, 10);
      this.sphere = self.createMesh(sphereGeom);
      this.sphere.position.set(10, 5, 0);
      var cubeGeom = new Three.BoxGeometry(6, 6, 6);
      this.cube = self.createMesh(cubeGeom);
      this.cube.position.set(0, 3, 10);
      this.group.add(this.sphere);
      this.group.add(this.cube);
      this.scene.add(this.group);
   },
   createMesh: function(geom){
      var meshMaterial = new Three.MeshNormalMaterial();
      meshMaterial.side = Three.DoubleSide;
      var wireFrameMat = new Three.MeshBasicMaterial();
      wireFrameMat.wireframe = true;
      var plane = Three.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
      return plane;
   },
   createArrow: function(){
      var arrow = new Three.ArrowHelper(new Three.Vector3(0, 1, 0), this.group.position, 10, 0x0000ff);
      this.scene.add(arrow);
   },
/*********************************************************/
   createManyMergeGeometry: function(){
      //this.addCubeByEveryOne();
      this.addCubeByMergeOne();//效率高于一个一个添加物体的效率
   },
   addCubeByEveryOne: function(){
      var self = this;
      for (var i = 0; i < 4000; i++) {
         self.scene.add(self.addCube());
      }
   },
   addCubeByMergeOne: function(){
      var self = this;
      var geometry = new Three.Geometry();
      for (var i = 0; i < 4000; i++) {
         var cubeMesh = self.addCube();
         cubeMesh.updateMatrix();
         //缺点：失去对每个对象的单独控制
         geometry.merge(cubeMesh.geometry, cubeMesh.matrix);
      }
      self.scene.add(new Three.Mesh(geometry, this.cubeMaterial));
   },
   addCube: function(){
      var cubeSize = 1.0;
      var cubeGeometry = new Three.BoxGeometry(1, 1, 1);
      this.cubeMaterial = new Three.MeshNormalMaterial({color: 0x00ff00, transparent: true, opacity: 0.5});
      var cube = new Three.Mesh(cubeGeometry, this.cubeMaterial);
      cube.castShadow = true;
      cube.position.x = -60 + Math.round((Math.random() * 100));
      cube.position.y = Math.round((Math.random() * 10));
      cube.position.z = -150 + Math.round((Math.random() * 175));
      return cube;
   },
   render: function(){
      var step = 0.03;
      var self = this;
      /*if(self.grouping){
         this.group.rotation.y += step;
      }else{
         this.sphere.rotation.y += step;
         this.cube.rotation.y += step;
      }*/
      requestAnimationFrame($.proxy(this.render, this));
      this.renderer.render(this.scene, this.camera);
   }
}
module.exports = MergeMesh;