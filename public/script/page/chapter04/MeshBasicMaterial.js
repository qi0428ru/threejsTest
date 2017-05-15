/*
基础材质：MeshBasicMaterial。这种材质不考虑光照的影响，
使用这种材质的网格会被渲染成一些简单的平面多边形，而且你
也有机会显示几何体的线框
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
require('../../lib/CanvasRenderer.js');
require('../../lib/Projector.js');

var MeshBasicMaterial = {
   init: function(){
      this.step = 0;
      //创建场景
      this.scene = new Three.Scene();
      //创建相机
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera.position.x = -20;
      this.camera.position.y = 50;
      this.camera.position.z = 40;
      this.camera.lookAt(new Three.Vector3(10, 0, 0));
      //创建渲染器
      this.webGLRenderer = new Three.WebGLRenderer();
      this.webGLRenderer.setClearColor(new Three.Color(0xeeeeee, 1.0));
      this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
      this.webGLRenderer.shadowMapEnabled = true;
      this.canvasRenderer = new Three.CanvasRenderer();
      this.canvasRenderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer = this.webGLRenderer;
      //创建物体
      this.groundGeom = new Three.PlaneGeometry(100, 100, 4, 4);
      this.groundMaterial = new Three.MeshBasicMaterial({color: 0x777777});
      this.groundMesh = new Three.Mesh(this.groundGeom, this.groundMaterial);
      this.groundMesh.rotation.x = -Math.PI / 2;
      this.groundMesh.position.y = -20;
      this.scene.add(this.groundMesh);
      //创建球体等
      this.sphereGeom = new Three.SphereGeometry(14, 20, 20);
      this.cubeGeom = new Three.BoxGeometry(15, 15, 15);
      this.planeGeom = new Three.PlaneGeometry(14, 14, 4, 4);
      //创建基础材质
      this.meshMaterial = new Three.MeshBasicMaterial({color: 0x7777ff});
      this.sphere = new Three.Mesh(this.sphereGeom, this.meshMaterial);
      this.cube = new Three.Mesh(this.cubeGeom, this.meshMaterial);
      this.plane = new Three.Mesh(this.planeGeom, this.meshMaterial);
      this.sphere.position.x = 0;
      this.sphere.position.y = 3;
      this.sphere.position.z = 2;
      this.cube.position = this.sphere.position;
      this.plane.position = this.sphere.position;
      this.scene.add(this.cube);
      //灯光
      this.ambientLight = new Three.AmbientLight(0x0c0c0c);
      this.scene.add(this.ambientLight);
      this.spotLight = new Three.SpotLight(0xffffff);
      this.spotLight.position.set(-40, 60, -10);
      this.spotLight.castShadow = true;
      this.scene.add(this.spotLight);

      //添加场景到渲染器
      $('#WebGL-output').append(this.renderer.domElement);
      this.render();
      this.bindEvent();
   },
   bindEvent: function(){
      $('.js-switchRenderer').on('click', $.proxy(this.switchRenderer, this));
   },
   //wireframe:将材质渲染成线框
   //wireframeLineWidth:如果已经打开wireframe,这个属性可以定义线框中线的宽度
   //opacity:指物体的透明度，与属性transparent一起使用，属性值范围是0~1；
   //transparent:表示是否透明。如果为true,会根据opacity的值来渲染。如果为false,物体不透明，只是着色明亮些
   //visible:是否可见
   //needsUpdate:如果为true,就会使用新的材质属性刷新它的缓存
   changeCanvasMaterialAttr: function(){
      var self = this;
      self.meshMaterial.wireframe = true;
      self.meshMaterial.opacity = 0.2;
      self.meshMaterial.transparent = true;
      self.meshMaterial.wireframeLineWidth = 9;
   },
   changeWebMaterialAttr: function(){
      var self = this;
      self.meshMaterial.wireframe = false;
      self.meshMaterial.opacity = 1;
      self.meshMaterial.transparent = false;
      self.meshMaterial.wireframeLineWidth = 1;
   },
   switchRenderer: function(){
      var self = this;
      if(self.renderer instanceof Three.WebGLRenderer){
         self.renderer = self.canvasRenderer;
         self.changeCanvasMaterialAttr();
         $('#WebGL-output').empty();
         $('#WebGL-output').append(self.renderer.domElement);
      }else{
         self.renderer = self.webGLRenderer;
         self.changeWebMaterialAttr();
         $('#WebGL-output').empty();
         $('#WebGL-output').append(self.renderer.domElement);
      }
   },
   render: function(){
      var self = this;
      self.step += 0.01;
      self.cube.rotation.y = self.step;
      self.sphere.rotation.y = self.step;
      self.plane.rotation.y = self.step;
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   }
}
module.exports = MeshBasicMaterial;