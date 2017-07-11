
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
require('../../lib/SceneExporter.js');
require('../../lib/SceneLoader.js');
var LoadMesh = {
   init: function(){
      this.grouping = true;
      this.initScene();
      this.initCamera();
      this.initRenderer();
      //this.createKnot();
      //this.createSphere();
      this.blenderCreate();
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
      //$('.js-changeRotation').on('click', $.proxy());
      $('.js-meshSave').on('click', $.proxy(this.meshSave, this));
      $('.js-meshLoad').on('click', $.proxy(this.meshLoad, this));
      $('.js-sceneSave').on('click', $.proxy(this.sceneSave, this));
      $('.js-sceneLoad').on('click', $.proxy(this.sceneLoad, this));
      $('.js-sceneClear').on('click', $.proxy(this.clearScene, this));
      
   },
/*********************加载物体********************************/
   createKnot: function(){
      var self = this;
      //这种扭曲形状不适合复制
      var knot = new Three.TorusKnotGeometry(10, 1, 64, 8, 2, 3, 1);
      //var knot = new Three.SphereGeometry(2, 20, 20);
      this.knotMesh = self.createMesh(knot);
      self.scene.add(this.knotMesh);
   },
   meshLoad: function(){
      var self = this;
      var json = localStorage.getItem('json');
      if (json) {
         var loadedGeometry = JSON.parse(json);
         var loader = new Three.ObjectLoader();
         this.loadedMesh = loader.parse(loadedGeometry);
         this.loadedMesh.position.x -= 50;
         self.scene.add(this.loadedMesh);
      }
   },
   meshSave: function(){
      var self = this;
      var result = self.knotMesh.toJSON();
      localStorage.setItem('json', JSON.stringify(result));
   },
   createMesh: function(geom){
      var meshMaterial = new Three.MeshBasicMaterial({
          vertexColors: Three.VertexColors,
          wireframe: true,
          wireframeLinewidth: 2,
          color: 0xaaaaaa
      });
      meshMaterial.side = Three.DoubleSide;
      var mesh = new Three.Mesh(geom, meshMaterial);
      return mesh;
   },
/*****************************************************/
/*********************加载场景************************/
   createSphere: function(){
      var self = this;
      var material = new Three.MeshLambertMaterial({color: 0x7777ff});
      var geom = new Three.SphereGeometry(4, 20, 20);
      var sphere = new Three.Mesh(geom, material);
      sphere.position.x = 20;
      sphere.position.y = 0;
      sphere.position.z = 2;
      self.scene.add(sphere);
   },
   sceneSave: function(){
      var self = this;
      var exporter = new Three.SceneExporter();
      var sceneJson = JSON.stringify(exporter.parse(self.scene));
      localStorage.setItem('scene', sceneJson);
   },
   sceneLoad: function(){
      var self = this;
      var json = (localStorage.getItem('scene'));
      var sceneLoader = new Three.SceneLoader();
      sceneLoader.parse(JSON.parse(json), function (e) {
         self.scene = e.scene;
      }, '.');
   },
   clearScene: function (){
      var self = this;
      self.scene = new Three.Scene();
   },
/*****************************************************/
/******************************************************/
   //路径是相对于该网页的
   blenderCreate: function(){
      var loader = new Three.JSONLoader();
      loader.load('/script/assets/misc_chair01.js', function(geom, mat){
         this.mesh = new Three.Mesh(geometry, mat[0]);
         this.mesh.scale.x = 15;
         this.mesh.scale.y = 15;
         this.mesh.scale.z = 15;
         self.scene.add(this.mesh);
      }, '/script/assets/');
   },
/****************************************************/
   render: function(){
      var step = 0.03;
      var self = this;
      //self.knotMesh.rotation.y += step
      requestAnimationFrame($.proxy(this.render, this));
      this.renderer.render(this.scene, this.camera);
   }
}
module.exports = LoadMesh;