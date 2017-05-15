/*
MeshLambertMaterial:用于暗淡，不光亮表面；
MeshPhongMaterial:用于光亮表面
shaderMaterial:表示创建自己的着色器
LineBasicMaterial:通过线段基础材质可以设置线段的颜色、宽度、端点、和连接点属性
LineDashedMaterial:跟LineBasicMaterial的属性一样，通过制定短划线和空格的长度，可以创建出虚线的效果
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');

var HighMesh = {
   init: function(){
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
      this.planeGeometry = new Three.BoxGeometry(100, 100, 4, 4);
      this.planeMaterial = new Three.MeshBasicMaterial({color: 0x555555});
      this.plane = new Three.Mesh(this.planeGeometry, this.planeMaterial);
      this.plane.recieveShow = true;
      this.plane.rotation.x = -Math.PI/2;
      this.plane.position.y = -2;
      this.scene.add(this.plane);
      //灯光
      this.ambientLight = new Three.AmbientLight(0X0C0C0C);
      this.scene.add(this.ambientLight);
      this.spotLight = new Three.SpotLight(0xffffff);
      this.spotLight.position.set(-30, 60, 60);
      this.spotLight.castShadow = true;
      this.scene.add(this.spotLight);
      $('#WebGL-output').append(this.renderer.domElement);
      //this.createLambertMaterial();
      this.createPhongMaterial();
      this.render();
   },
   createLambertMaterial: function(){
      var self = this;
      var cubeGeometry = new Three.BoxGeometry(15, 15, 15);
      this.meshMatarial = new Three.MeshLambertMaterial({color: 0x7777ff});
      self.changeAttribute();
      this.cube = new Three.Mesh(cubeGeometry, this.meshMatarial);
      //self.scene.add(this.cube);
      var sphereGeometry = new Three.SphereGeometry(14, 20, 20);
      this.sphere = new Three.Mesh(sphereGeometry, this.meshMatarial);
      this.sphere.position.x = 0;
      this.sphere.position.y = 3;
      this.sphere.position.z = 2;

      self.scene.add(this.sphere);
   },
   createPhongMaterial: function(){
      var self = this;
      this.meshMatarial = new Three.MeshPhongMaterial({color: 0x7777ff});
      self.changeAttribute();
      var sphereGeometry = new Three.SphereGeometry(14, 20, 20);
      this.sphere = new Three.Mesh(sphereGeometry, this.meshMatarial);
      this.sphere.position.x = 0;
      this.sphere.position.y = 5;
      this.sphere.position.z = 2;
      self.scene.add(this.sphere);
   },
   /*
   ambient表示材质的环境色，这个属性会与AmbientLight光源的颜色相乘；默认值是白色;
   emissive表示材质发射的颜色。只是一种纯粹的，不受其他光照影响的颜色。默认值是黑色
   */
   changeAttribute: function(){
      var self = this;
      self.meshMatarial.ambient = new Three.Color(0xffffff);
      self.meshMatarial.emissive = new Three.Color(0x2a2a2a);
      /*MeshPhongMaterial属性
         specular:指定该材质的光亮程度及其高光部分的颜色
         shininess:指定高光部分的亮度。默认值为30
      */

      self.meshMatarial.specular = new Three.Color(0xffffff);
      self.meshMatarial.shininess = 143;
   },
   render: function(){
      var self = this;
      self.sphere.rotation.y += 0.01;
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   }
}
module.exports = HighMesh;