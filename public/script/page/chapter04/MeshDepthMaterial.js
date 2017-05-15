/*
基于深度着色的MeshDepthMaterial:这种材质的物体，
其外观不是由光照或某个材质属性决定的，
而是由物体到相机之间的距离决定的
相机的far和near之间的距离：如果距离非常大，物体只会消失一点；
如果距离非常小，物体消失的效果会非常明显
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');

var MeshDepthMaterial = {
   init: function(){
      this.step = 0;
      //创建场景
      this.scene = new Three.Scene();
      //此属性保证场景中的所有物体都会使用该材质(使用混合材质时此属性不用设置)
      //this.scene.overrideMaterial = new Three.MeshDepthMaterial();
      //创建相机
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 10, 130);
      this.camera.position.x = -50;
      this.camera.position.y = 40;
      this.camera.position.z = 50;
      this.camera.lookAt(this.scene.position);
      //创建渲染器
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setClearColor(new Three.Color(0x00000, 1.0));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMapEnabled = true;

      //添加场景到渲染器
      $('#WebGL-output').append(this.renderer.domElement);
      this.render();
      this.bindEvent();
   },
   bindEvent: function(){
      $('.js-addCube').on('click', $.proxy(this.addCube, this));
      $('.js-removeCube').on('click', $.proxy(this.removeCube, this));
      $('.js-changeNear').on('click', $.proxy(this.changeNear, this));
      $('.js-changeFar').on('click', $.proxy(this.changeFar, this));
   },
   addCube: function(){
      var self = this;
      var cubeSize = Math.ceil(3 + (Math.random()*3));
      var cubeGeom = new Three.BoxGeometry(cubeSize, cubeSize, cubeSize);
      //单独材质
      //var cubeMaterial = new Three.MeshLambertMaterial({color: Math.random() * 0xffffff});
      //var cube = new Three.Mesh(cubeGeom, cubeMaterial);
      //单独材质结束--------------------------------------
      /*混合材质
      注：使用混合材质时必须把transparent设置为true,并指定融合模式
      如果transparent不指定为true，只是会得到一些绿色物体*/
      var cubeMaterial = new Three.MeshDepthMaterial();
      var colorMaterial = new Three.MeshBasicMaterial({
         color: 0x00ff00, 
         transparent: true, 
         blending: Three.MultiplyBlending
      });
      var cube = new Three.SceneUtils.createMultiMaterialObject(cubeGeom, [colorMaterial, cubeMaterial]);
      cube.children[1].scale.set(0.99, 0.99, 0.99);
      //-----------混合材质结束
      cube.castShadow = true;
      cube.position.x = -60 + Math.round(Math.random() * 100);
      cube.position.y = Math.round(Math.random() * 10);
      cube.position.z = -100 + Math.round(Math.random() * 150);
      self.scene.add(cube);
   },
   removeCube: function(){
      var self = this;
      var allChildren = self.scene.children;
      var lastChildren = allChildren[allChildren.length - 1];
      //混合模式无法使用此方式移除
      if(lastChildren instanceof Three.Mesh){
         self.scene.remove(lastChildren);
      }
   },
   changeNear: function(){
      var self = this;
      var num = 10;
      self.camera.near += num;
   },
   changeFar: function(){
      var self = this;
      var num = 10;
      self.camera.far += num;
   },
   render: function(){
      var self = this;
      self.step += 0.02;
      self.scene.traverse(function(e){
         if(e instanceof Three.Mesh){
            e.rotation.x = self.step;
            e.rotation.y = self.step;
            e.rotation.z = self.step;
         }
      });
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   }
}
module.exports = MeshDepthMaterial;