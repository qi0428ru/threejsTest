var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
//示例1
var Chapter02One = require('./Chapter02-2.1.1.js');
//示例2
var Chapter02Sencond = require('./Chapter02-2.2.1.js');
var Charper02 = {
   init: function(){
      this.planeGeometry = null;
      this.planeMaterial = null;
      this.scene = null;
      this.renderer = null;
      this.camera = null;
      this.plane = null;
      this.initScene();
      this.initPlane();
      //Chapter02One.init(this.scene, this.plane, this.camera, this.renderer,this.planeGeometry);
      Chapter02Sencond.init(this.scene, this.plane, this.camera, this.renderer,this.planeGeometry);
   },
  
   initPlane: function(){
      //创建平面
      var self = this;
      self.planeGeometry = new Three.PlaneGeometry(180,180);
      self.planeMaterial = new Three.MeshLambertMaterial({color: 0xffffff});
      self.plane = new Three.Mesh(self.planeGeometry, self.planeMaterial);
      self.plane.receiveShadow = true;
      self.plane.rotation.x = -0.5*Math.PI;
      self.plane.position.x = 0;
      self.plane.position.y = 0;
      self.plane.position.z = 0;
      self.scene.add(self.plane);
   },
   initScene: function(){
      //创建场景
      var self = this;
      self.scene = new Three.Scene();
      //雾化
      //0.015表示near属性值，100表示far的属性值，从而决定雾从什么地方开始，以及浓度加深的程度
      //self.scene.fog = new Three.Fog(0xffffff, 0.015, 100);
      //0.015表示雾的浓度
      //self.scene.fog = new Three.FogExp2(0xffffff, 0.015);
      //材质覆盖属性
      //self.scene.overrideMaterial = new Three.MeshLambertMaterial({color: 0xffffff})
      //创建渲染器（相当于画布）
      self.renderer = new Three.WebGLRenderer();
      self.renderer.setClearColor(0xEEEEEE);
      self.renderer.setSize(window.innerWidth, window.innerHeight);
      

      //创建环境灯
      var ambientLight = new Three.AmbientLight(0x0c0c0c);
      self.scene.add(ambientLight);
      //创建聚光灯光源
      /*var spotLight = new Three.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, -10);
      spotLight.castShadow = true;
      self.scene.add(spotLight);*/

      var directionalLight = new Three.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(-20, 40, 60);
        self.scene.add(directionalLight);

      //创建相机
      self.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      //相机位置
      self.camera.position.x = 120;
      self.camera.position.y = 60;
      self.camera.position.z = 180;
      self.camera.lookAt(self.scene.position);
      //self.switchCamera();
      //画布添加到页面中
      $('#WebGL-output').append(self.renderer.domElement);
   }
}
Charper02.init();

