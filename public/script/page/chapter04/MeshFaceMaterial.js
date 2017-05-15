/*
MeshFaceMaterial为每个面指定材质;
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');

var MeshFaceMaterial = {
   init: function(){
      this.ground = new Three.Mesh();
      //常见场景
      this.scene = new Three.Scene();
      //创建相机
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera.position.x = -20;
      this.camera.position.y = 30;
      this.camera.position.z = 40;
      this.camera.lookAt(this.scene.position);
      //创建渲染器
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setClearColor(new Three.Color(0xEEEEEE, 0.1));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMapEnable = true;
      //常见平面
      this.planeGeometry = new Three.BoxGeometry(60, 40, 1, 1);
      this.planeMaterial = new Three.MeshLambertMaterial({color: 0xffffff});
      this.plane = new Three.Mesh(this.planeGeometry, this.planeMaterial);
      this.plane.recieveShow = true;
      this.plane.rotation.x = -Math.PI/2;
      this.plane.position.x = -0;
      this.plane.position.y = -2;
      this.plane.position.z = 0;
      this.scene.add(this.plane);
      //灯光
      this.spotLight = new Three.SpotLight(0xffffff);
      this.spotLight.position.set(-40, 60, -10);
      this.spotLight.castShadow = true;
      this.scene.add(this.spotLight);
      $('#WebGL-output').append(this.renderer.domElement);
      this.addObject();
      this.render();
      //this.bindEvent();
   },
   addObject: function(){
      var self = this;
      var mats = [];
      mats.push(new Three.MeshBasicMaterial({color: 0x009e60}));
      mats.push(new Three.MeshBasicMaterial({color: 0x0051ba}));
      mats.push(new Three.MeshBasicMaterial({color: 0xffd500}));
      mats.push(new Three.MeshBasicMaterial({color: 0xff5800}));
      mats.push(new Three.MeshBasicMaterial({color: 0xC41E3A}));
      mats.push(new Three.MeshBasicMaterial({color: 0xffffff}));
      var faceMaterial = new Three.MeshFaceMaterial(mats);
      for (var x=0; x<3; x++) {
         for (var y=0; y<3; y++) {
            for (var z=0; z<3; z++) {
               var cubeGeom = new Three.BoxGeometry(2.9, 2.9, 2.9);
               var cube = new Three.Mesh(cubeGeom, faceMaterial);
               cube.position.set(x * 3 - 3, y * 3, z * 3 - 3);
               self.ground.add(cube);
            }
         }
      }
      self.scene.add(self.ground);
   },
   render: function(){
      var self = this;
      self.ground.rotation.y += 0.01;
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   }
}
module.exports = MeshFaceMaterial;