/*
PerspectiveCamera的参数：
fov:视场。表示从相机位置能够看到的部分场景。默认值为45。
aspect: 长宽比。长宽比决定了水平视场和垂直视场之间的比例关系。默认值：window.innerWidth/window.innerHeight
near:表示离相机多近的地方开始渲染场景。默认值0.1
far:表示相机可以从它所处的位置看多远。默认值1000

*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
require('../../lib/PLYLoader.js');
var TWEEN = require('../../lib/tween.min.js');
var loadedGeometry;
var pointCloud;
var Tween = {
   init: function(){
      //this.loadedGeometry = null;
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initRender();
      this.initTween();
      this.initObject();
      this.render();
   },
   initScene: function(){
      this.scene = new Three.Scene();
   },
   initCamera: function(){
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera.position.x = 10;
      this.camera.position.y = 10;
      this.camera.position.z = 10;
      this.camera.lookAt(new Three.Vector3(0, -2, 0));
   },
   initRender: function(){
      this.webGLRender = new Three.WebGLRenderer();
      this.webGLRender.setClearColor(new Three.Color(0x000, 1.0));
      this.webGLRender.setSize(window.innerWidth, window.innerHeight);
      this.webGLRender.shadowMapEnabled = true;
      $('#WebGL-output').append(this.webGLRender.domElement);
      //document.getElementById('WebGL-output').appendChild(this.webGLRender.domElement);
   },
   initLight: function(){
      var self = this;
      this.spotLight = new Three.SpotLight(0XFFFFFF);
      this.spotLight.position.set(20, 20, 20);
      self.scene.add(self.spotLight);
   },
   initObject: function(){
      var self = this;
      pointCloud = new Three.Object3D();
      var loader = new Three.PLYLoader();
      loader.load('/script/assets/test.ply', function(geometry){
         loadedGeometry = geometry.clone();
         //console.log(geometry)
         var material = new Three.PointCloudMaterial({
            color: 0xffffff,
            size: 0.4,
            opacity: 0.6,
            transparent: true,
            blending: Three.AdditiveBlending,
            map: self.generateSprite()

         })
         pointCloud = new Three.PointCloud(geometry, material);
         pointCloud.sortParticles = true;
         //console.log(self.tween)
         self.tween.start();
         self.scene.add(pointCloud);
         //self.onUpdate();
      })
   },
   generateSprite: function(){
      var canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;

      var context = canvas.getContext('2d');
      var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
      gradient.addColorStop(1, 'rgba(0,0,0,1)');

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      var texture = new Three.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
   },
   initTween: function(){
      var self = this;
      var posSrc = {pos: 1};
      this.tween = new TWEEN.Tween(posSrc).to({pos: 0}, 5000);
      this.tween.easing(TWEEN.Easing.Sinusoidal.InOut);
      this.tweenBack = new TWEEN.Tween(posSrc).to({pos: 1}, 5000);
      this.tweenBack.easing(TWEEN.Easing.Sinusoidal.InOut);

      this.tween.chain(this.tweenBack);
      this.tweenBack.chain(this.tween);
      this.tween.onUpdate(this.onUpdate);
      this.tweenBack.onUpdate(this.onUpdate);
   },
   onUpdate: function(){
      var count = 0;
      var pos = this.pos;
      loadedGeometry.vertices.forEach(function (e) {
         var newY = ((e.y + 3.22544) * pos) - 3.22544;
         pointCloud.geometry.vertices[count++].set(e.x, newY, e.z);
      });

      pointCloud.sortParticles = true;
   },
   render: function(){
      var self = this;
      TWEEN.update();
      requestAnimationFrame($.proxy(this.render, this));
      self.webGLRender.render(self.scene, self.camera);
   }
}

module.exports = Tween;