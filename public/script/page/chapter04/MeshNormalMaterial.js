/*计算法向颜色的MeshNormalMaterial
此材质不会对渲染时使用的颜色有任何影响
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');

var MeshNormalMaterial = {
   init: function(){
      this.step = 0;
      //常见场景
      this.scene = new Three.Scene();
      //创建相机
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera.position.x = -20;
      this.camera.position.y = 30;
      this.camera.position.z = 40;
      this.camera.lookAt(new Three.Vector3(10, 0, 0));
      //创建渲染器
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setClearColor(new Three.Color(0xEEEEEE, 0.1));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMapEnable = true;
      //常见平面
      this.groundGeom = new Three.BoxGeometry(100, 100, 4, 4);
      this.groundMaterial = new Three.MeshBasicMaterial({color: 0x777777});
      this.planeMesh = new Three.Mesh(this.groundGeom, this.groundMaterial);
      this.planeMesh.rotation.x = -Math.PI/2;
      this.planeMesh.position.y = -20;
      this.scene.add(this.planeMesh);
      //创建物体
      this.sphereGeom = new Three.SphereGeometry(14, 20, 20);
      this.meshMaterial = new Three.MeshNormalMaterial({color: 0x7777ff});
      this.meshMaterial.shading = Three.FlatShading;
      this.sphere = new Three.Mesh(this.sphereGeom, this.meshMaterial);
      this.sphere.position.x = 0;
      this.sphere.position.y = 3;
      this.sphere.position.z = 2;
      this.showArrow();
      this.scene.add(this.sphere);
      this.cubeGeom = new Three.BoxGeometry(15, 15, 15);
      this.cube = new Three.Mesh(this.cubeGeom, this.meshMaterial);
      this.cube.position = this.sphere.position;
      //灯光
      this.ambientLight = new Three.AmbientLight(0x0c0c0c);
      this.scene.add(this.ambientLight);
      this.spotLight = new Three.SpotLight(0xffffff);
      this.spotLight.position.set(-40, 60, -10);
      this.spotLight.castShadow = true;
      this.scene.add(this.spotLight);
      $('#WebGL-output').append(this.renderer.domElement);
      this.render();
      this.bindEvent();
   },
   bindEvent: function(){
      $('.js-changeFlat').on('click', $.proxy(this.changeFlat, this));
      $('.js-changeObject').on('click', $.proxy(this.changeObject, this));
   },
   //添加向量箭头
   showArrow: function(){
      var self = this;
      for(var f=0, f1=self.sphere.geometry.faces.length; f<f1; f++){
         var face = self.sphere.geometry.faces[f];
         var centroid = new Three.Vector3(0, 0, 0);
            centroid.add(self.sphere.geometry.vertices[face.a]);
            centroid.add(self.sphere.geometry.vertices[face.b]);
            centroid.add(self.sphere.geometry.vertices[face.c]);
            centroid.divideScalar(3);
         var arrow = new Three.ArrowHelper(
            face.normal, 
            centroid, 
            2, 
            0x3333ff);
         self.sphere.add(arrow);
      }
   },
   changeObject: function(){//圆形变为方形
      var self = this;
      self.scene.remove(self.sphere);
      self.scene.add(self.cube);
   },
   changeFlat: function(evt){
      var self = this;
      var $target = $(evt.currentTarget);
      var type = $target.data('type');
      if(type == 'flat'){
         self.meshMaterial.shading = Three.SmoothShading;//平滑着色
         $target.data('type', 'smooth');
      }else{
         self.meshMaterial.shading = Three.FlatShading;//平面着色
         $target.data('type', 'flat');
      }
      //移除后再添加
      var oldPos = self.sphere.position.clone();
      self.scene.remove(self.sphere);
      self.sphere = new Three.Mesh(self.sphere.geometry.clone(), self.meshMaterial);
      self.scene.add(self.sphere);
   },
   render: function(){
      var self = this;
      self.step += 0.01;
      self.sphere.rotation.y = self.step;
      self.cube.rotation.y = self.step;
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   }
}
module.exports = MeshNormalMaterial;