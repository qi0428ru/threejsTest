/*
SpriteMaterial方法根据参数parameters创建Sprite(点精灵)的材质类型
*/
/*
在webGLRender中创建粒子系统步骤：
1.创建材质：new Three.PointCloudMaterial()
2.创建几何体：使用new Three.Geometry()创建几何体队形，
使用new Three.Vector3(x,y,z)创建粒子加入到对象中
3.使用new Three.PointCloud(geom, material)创建系统，添加到场景中
new Three.PointCloudMaterial({
   size: 4,//指定粒子的大小 
   transparent: true,//设置为true时，粒子在渲染的时候会根据opacity属性值来确定其透明度
   opacity:0.5,//跟transparent属性一起使用设置粒子的透明度
   vertexColors: true,//如果设置为true,而且几何体的colors数组也有值，那就使用颜色数组中的值；默认为false
   sizeAttenuation: true,//指定为false时，所有粒子的尺寸相同，无论距离远近；若为true,粒子的大小决定其距离相机的远近；默认为true
   color: 0xffffff
});
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
require('../../lib/CanvasRenderer.js');
require('../../lib/Projector.js');
var ParticleSystem = {
   init: function(){
      this.step = 0;
      this.sprite = 2;//修改此值，可以变化精灵的样子
      this.initScene();
      this.initCamera();
      //创建canvas下的粒子系统
      //this.initCanvasParticle();
      //创建webGL下的粒子系统
      this.initWebGLParticle();
      this.bindEvent();
      this.render();
   },
   initCanvasParticle: function(){
      this.initRenderer();
      //this.createParticle();
      this.createPacManByCanvas();
   },
   initWebGLParticle: function(){
      this.initWebRender();
      
      //this.createWebGLParticle();//创建webGL的粒子系统
      //this.createPacManByWebGL();//创建PacMan
      //this.createRainy();//创建雨滴
      //this.createSnowy();//创建雪花
      //this.createSprite(this.sprite);//创建精灵
      //this.createManySprite();//创建多个精灵
      this.createGemmetry();//创建几何体
   },
   initScene: function(){
      this.scene = new Three.Scene();
   },
   initCamera: function(){
      //创建精灵时的相机
      //this.camera = new Three.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -10, 10);
      
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera.position.x = 20;
      this.camera.position.y = 0;
      this.camera.position.z = 150;
   },
   initRenderer: function(){
      this.canvasRender = new Three.CanvasRenderer();
      this.canvasRender.setClearColor(new Three.Color(0x000000, 0.1));
      this.canvasRender.setSize(window.innerWidth, window.innerHeight);
      $('#WebGL-output').append(this.canvasRender.domElement);
      this.renderer = this.canvasRender;
   },
   initWebRender: function(){
      this.webGLRender = new Three.WebGLRenderer();
      this.webGLRender.setClearColor(new Three.Color(0x000000,0.1));
      this.webGLRender.setSize(window.innerWidth, window.innerHeight);
      $('#WebGL-output').append(this.webGLRender.domElement);
      this.renderer = this.webGLRender;
   },
   bindEvent: function(){
      $('.js-changeParticle').on('click', $.proxy(this.changeParticle, this));
   },
   //使用canvasRender时创建粒子
   createParticle: function(){
      var material = new Three.SpriteMaterial();
      for(var x=-5; x<5; x++){
         for(var y=-5; y<5; y++){
            var particle = new Three.Particle(material);
            particle.position.set(x*10, y*10, 0);
            this.scene.add(particle);
         }
      }
   },
   //使用webGLRender时创建粒子
   createWebGLParticle: function(){
      //ParticleBasicMaterial改名为PointCloudMaterial
      var material = new Three.PointCloudMaterial({
         size: 4, 
         transparent: true,
         opacity:0.5,
         vertexColors: true,
         sizeAttenuation: false, 
         color: 0xffffff
      });
      var geom = new Three.Geometry();
      var range = 1000;
      /*for (var x = -5; x < 5; x++) {
          for (var y = -5; y < 5; y++) {
              var particle = new Three.Vector3(x * 10, y * 10, 0);
              geom.vertices.push(particle);
              geom.colors.push(new Three.Color(Math.random() * 0x00ffff));
          }
      }*/
      for(var i=0;i<15000;i++){
         var particle = new Three.Vector3(
            Math.random()*range -range/2,
            Math.random()*range -range/2,
            Math.random()*range -range/2
         );
         geom.vertices.push(particle);
         var color = new Three.Color(0x00ff00);
         color.setHSL(
            color.getHSL().h,
            color.getHSL().s,
            Math.random()*color.getHSL().l
         );
         geom.colors.push(color);
      }
      //ParticleSystem改名为PointCloud
      this.cloud = new Three.PointCloud(geom, material);
      this.scene.add(this.cloud);
   },
/******************************************************************/
   //使用canvasRender创建Pac-Man
   //使用材质SpriteCanvasMaterial
   createPacManByCanvas: function(){
      var self = this;
      var material = new Three.SpriteCanvasMaterial({
         //以画布上下文为参数的函数；此函数在渲染粒子时调用。调用该函数将在画布上下文中产生一个输出，该输出将会以粒子形态展示出来
         program: self.draw,
         color: 0xffffff
      });
      material.rotation = Math.PI;
      var range = 500;
      for(var i=0;i<1000;i++){
         var particle = new Three.Particle(material);
         particle.position.set(
            Math.random()*range - range/2,
            Math.random()*range - range/2,
            Math.random()*range - range/2
         );
         particle.scale.set(0.1, 0.1, 0.1);
         particle.rotation.z = Math.PI;
         this.scene.add(particle);
      }
   },
   draw: function(ctx){
      ctx.translate(-81, -84);

      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.moveTo(83, 116);
      ctx.lineTo(83, 102);
      ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
      ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
      ctx.lineTo(111, 116);
      ctx.lineTo(106.333, 111.333);
      ctx.lineTo(101.666, 116);
      ctx.lineTo(97, 111.333);
      ctx.lineTo(92.333, 116);
      ctx.lineTo(87.666, 111.333);
      ctx.lineTo(83, 116);
      ctx.fill();

      // the eyes
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(91, 96);
      ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
      ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
      ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
      ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
      ctx.moveTo(103, 96);
      ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
      ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
      ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
      ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
      ctx.fill();

      // the pupils
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
      ctx.fill();
   },
/******************************************************************/
   //在webGLRender中创建精灵
   createPacManByWebGL: function(){
      var self = this;
      var material = new Three.PointCloudMaterial({
         size: 15, 
         transparent: true,
         opacity:0.5,
         map: self.getTexture(),
         //vertexColors: false,
         sizeAttenuation: false, 
         color: 0xffffff
      });
      var geom = new Three.Geometry();
      var range = 500;
      for(var i=0;i<5000;i++){
         var particle = new Three.Vector3(
            Math.random()*range - range/2,
            Math.random()*range - range/2,
            Math.random()*range - range/2
         );
         geom.vertices.push(particle);
      }
      //ParticleSystem改名为PointCloud
      this.cloud = new Three.PointCloud(geom, material);
      //sortParticles设置为true保证粒子在渲染之前沿着屏幕上的Z轴排好序
      this.cloud.sortParticles = true;
      this.scene.add(this.cloud);
   },
   getTexture: function(){
      var canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;

      var ctx = canvas.getContext('2d');
      // the body
      ctx.translate(-81, -84);

      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.moveTo(83, 116);
      ctx.lineTo(83, 102);
      ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
      ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
      ctx.lineTo(111, 116);
      ctx.lineTo(106.333, 111.333);
      ctx.lineTo(101.666, 116);
      ctx.lineTo(97, 111.333);
      ctx.lineTo(92.333, 116);
      ctx.lineTo(87.666, 111.333);
      ctx.lineTo(83, 116);
      ctx.fill();

      // the eyes
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(91, 96);
      ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
      ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
      ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
      ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
      ctx.moveTo(103, 96);
      ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
      ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
      ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
      ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
      ctx.fill();

      // the pupils
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
      ctx.fill();

      var texture = new Three.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
   },
/********************************************************************/
/****************************************************************/
   //创建雨滴
   createRainy: function(){
      var self = this;
      var texture = Three.ImageUtils.loadTexture('../../../image/page/raindrop-3.png');
      self.createPointCloud(texture);
   },
   createPointCloud: function(texture){
      var geom = new Three.Geometry();
      var material = new Three.PointCloudMaterial({
         size: 10,
         transparent: true,
         opacity: 0.7,
         map: texture,
         blending: Three.AdditiveBlending,
         depthWrite: false,//设置为false，保证各个粒子系统之间不受影响
         sizeAttenuation: true,
         color: 0xffffff
      });
      var range = 1000;
      for (var i = 0; i < 1500; i++) {
          var particle = new Three.Vector3(

                  Math.random() * range - range / 2,
                  Math.random() * range * 1.5,
                  Math.random() * range - range / 2);
          particle.velocityY = 0.1 + Math.random() / 5;
          particle.velocityX = (Math.random() - 0.5) / 3;
          particle.velocityZ = (Math.random() - 0.5) / 3;
          geom.vertices.push(particle);
      }
      this.cloud = new Three.PointCloud(geom, material);
      this.cloud.sortParticles = true;

      this.scene.add(this.cloud);
   },
/*****************************************************/
   //创建雪花
   createSnowy: function(){
      var self = this;
      var texture1 = Three.ImageUtils.loadTexture('../../../image/page/snowflake1.png');
      var texture2 = Three.ImageUtils.loadTexture('../../../image/page/snowflake2.png');
      var texture3 = Three.ImageUtils.loadTexture('../../../image/page/snowflake3.png');
      var texture4 = Three.ImageUtils.loadTexture('../../../image/page/snowflake5.png');
      self.createPointCloud(texture1);
      self.createPointCloud(texture2);
      self.createPointCloud(texture3);
      self.createPointCloud(texture4);
   },
/*******************************************************/
   //使用精灵创建系统
   createSprite: function(sprite){
      var self = this;
      var spriteMaterial = new Three.SpriteMaterial({
         opacity: 0.6,
         color: 0xffffff,
         transparent: true,
         useScreenCoordinates: true,//设置为true表示精灵的位置为决定位置，原点为屏幕的左上角
         map: self.getSpritePic()
      });
      spriteMaterial.map.offset = new Three.Vector2(0.2 * sprite, 0);
      spriteMaterial.map.repeat = new Three.Vector2(1 / 5, 1);
      spriteMaterial.depthTest = false;

      spriteMaterial.blending = Three.AdditiveBlending;

      var sprite = new Three.Sprite(spriteMaterial);
      sprite.scale.set(120, 120, 120);
      sprite.position.set(100, 50, -10);
      sprite.velocityX = 5;

      self.scene.add(sprite);
   },
   createManySprite: function(){
      var self = this;
      this.ground = new Three.Object3D();
      var range = 200;
      for(var i=0; i<400; i++){
         var spriteMaterial = new Three.SpriteMaterial({
            opacity: 0.6,
            color: 0xffffff,
            transparent: true,
            useScreenCoordinates: false,//设置为true表示精灵的位置为决定位置，原点为屏幕的左上角
            map: self.getSpritePic()
         });
         spriteMaterial.map.offset = new Three.Vector2(0.2 * (i%5), 0);
         spriteMaterial.map.repeat = new Three.Vector2(1 / 5, 1);
         spriteMaterial.depthTest = false;

         spriteMaterial.blending = Three.AdditiveBlending;

         var sprite = new Three.Sprite(spriteMaterial);
         sprite.scale.set(10, 10, 10);
         sprite.position.set(
            Math.random() * range - range / 2, 
            Math.random() * range - range / 2, 
            Math.random() * range - range / 2
         );
         sprite.velocityX = 5;
         this.ground.add(sprite);
      }

      self.scene.add(this.ground);
   },
   getSpritePic: function(){
      var texture = new Three.ImageUtils.loadTexture("../../../image/page/sprite-sheet.png");
      return texture;
   },
/**********************************************************/
   //根据几何体创建粒子系统
   createGemmetry: function(){
      var self = this;
      var geom = new Three.TorusKnotGeometry(13, 1.7, 156, 12, 5, 4, 3.5);
      this.knot = self.createMesh(geom);
      self.scene.add(this.knot);
   },
   changeParticle: function(){
      var self = this;
      if(self.knot){
         self.scene.remove(self.knot);
      }
      //需要重新创建几何体，否则报错
      var geom = new Three.TorusKnotGeometry(13, 1.7, 156, 12, 5, 4, 3.5);
      self.knot = self.createParticleByObject(geom);
      self.scene.add(self.knot);
   },
   createParticleByObject: function(geom){
      var self = this;
      var material = new Three.PointCloudMaterial({
          color: 0xffffff,
          size: 3,
          transparent: true,
          blending: Three.AdditiveBlending,
          map: self.generateSprite()
      });

      var cloud = new Three.PointCloud(geom, material);
      cloud.sortParticles = true;
      return cloud;
   },
   generateSprite: function() {

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
   createMesh: function(geom){
      var meshMaterial = new Three.MeshNormalMaterial();
      //设置双面
      meshMaterial.side = Three.DoubleSide;
      //使用多种材质createMultiMaterialObject
      var plane = new Three.SceneUtils.createMultiMaterialObject(geom, 
         [meshMaterial]);
      return plane;
   },
   render: function(){
      var self = this;
      this.step += 0.01;
      //self.cloud.rotation.x = this.step;
      //self.cloud.position.z = self.step;
      //雨滴动画
      /*var vertices = self.cloud.geometry.vertices;
      vertices.forEach(function (v) {
          v.y = v.y - (v.velocityY);
          v.x = v.x - (v.velocityX);

          if (v.y <= 0) v.y = 60;
          if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
      });*/
      //雪花动画
      /*self.scene.children.forEach(function (child) {
          if (child instanceof Three.PointCloud) {
              var vertices = child.geometry.vertices;
              vertices.forEach(function (v) {
                  v.y = v.y - (v.velocityY);
                  v.x = v.x - (v.velocityX);
                  v.z = v.z - (v.velocityZ);

                  if (v.y <= 0) v.y = 60;
                  if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
                  if (v.z <= -20 || v.z >= 20) v.velocityZ = v.velocityZ * -1;
              });
          }
      });*/
      //精灵动画(创建一个)
      /*self.scene.children.forEach(function (e) {
          if (e instanceof Three.Sprite) {
              // move the sprite along the bottom
              e.position.x = e.position.x + e.velocityX;
              if (e.position.x > window.innerWidth) {
                  e.velocityX = -5;
                  e.material.map.offset.set(1 / 5 * (self.sprite % 4), 0);
              }
              if (e.position.x < 0) {
                  e.velocityX = 5;
              }
          }
      });*/
      //self.ground.rotation.x = self.step;
      requestAnimationFrame($.proxy(this.render, this));
      this.renderer.render(this.scene, this.camera);
      //this.webGLRender.render(this.scene, this.camera);
   }
}
module.exports = ParticleSystem;