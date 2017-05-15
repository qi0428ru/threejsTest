/*
new Three.ConvexGeometry(points);
ConvexGeometry:唯一的参数为points.创建包围这些点最小的图形
*/
/*
new Three.LatheGeometry(points, segments, phiStart, phiLength);
LatheGeometry:可以从一条光滑曲线可是创建图形；
参数：
points:指定构成样条曲线的点；
segments：创建图形时所用的分段数目；
phiStart:创建图形时从圆的何处开始
phiLength:属性指定创建出的图形有多完整
*/
/*
ExtrudeGeometry:拉伸创建几何体
new Three.ExtrudeGeometry(self.drawShape(), options);
options={
   amount:该属性指定图形可以拉多高；
   bevelThickness:指定斜角的深度。默认值为6；
   bevelSize:指定斜角的高度；
   bevelSegments:斜角的分段数；段数越多，斜角越光滑
   bevelEnabled:如果设置为true,就会有斜角
   curveSegments:拉伸图形时，曲线分成多少段；
   steps:定义拉伸体被分成多少段
}
*/
/*
new Three.TubeGeometry(
   path, 
   segments, 
   radius, 
   radiusSegments, 
   closed
);
path：是用一个new Three.SplineCurve3(points)指定的管道路径；将这些点转化为SplineCurve3曲线，即需要这些点来定义一条光滑曲线；
segments:指定构建这个管道所用的分段数；（垂直轨道方向的分段）
radius:指定管道半径
radiusSegments:指定管道圆周的分段数（顺着管道方向的分段）
closed:为true时，管道的头和尾会连接起来
*/
/*
new Three.ParametricGeometry(function, slices, stacks, useTris);
ParametricGeometry:创建基于等式的几何体
function:返回一个  Vector3类型的队形，作为图形上点的坐标。此处的函数不带括号
slices:u值应该分成多少分(u确定向量的x坐标)
stacks:v值应该分成多少分(v确定向量的z坐标)
useTris:默认值为false,若为true,该几何体创建时会使用三角面片
*/
/*
字体拉伸
Three.TextGeometry('Learning', options);
var options = {
   size: 90,//指定文本大小
   height: 90,//指定拉伸的长度
   weight: 'normal',//指定字体的权重
   font: 'helvetiker',//指定要用的字体名称
   style: 'normal',//指定字体样式
   bevelThickness: 2,//指定斜角的深度
   bevelSize: 4,//指定斜角的高度
   bevelSegments: 3,//斜角的分段数
   bevelEnabled: true,//设置为true时，展示斜角
   curveSegments: 12,//曲线分成多少段
   steps: 1//拉伸体被分成多少段
}
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
require('../../lib/ConvexGeometry.js');
var transformSVGPathExposed = require('../../lib/d3-threeD.js');
require('../../assets/helvetiker_bold.typeface.js');
require('../../assets/helvetiker_regular.typeface.js');
var CreateGeometry = {
   init: function(){
      this.step = 0;
      this.createScene();
      this.createCamera();
      this.createRenderer();
      this.createConvexGeometry();//创建包围这些点的最小图形（凸包）
      this.createLatheGeometry(12, 2, 2*Math.PI);//从一条光滑曲线开始创建图形
      this.createExtrudeGeometry();//创建拉伸图形
      this.createTubeGeometry();//创建管道
      this.createSvgExtrude();//svg拉伸
      this.createParamGeometry();//创建基于等式的几何体
      this.ceateText();//创建字体
      this.createLight();
      this.render();
   },
   createScene: function(){
      this.scene = new Three.Scene();
   },
   createCamera: function(){
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      /*this.camera.position.x = -80;
      this.camera.position.y = 80;
      this.camera.position.z = 80;
      this.camera.lookAt(new Three.Vector3(60, -60, 0));*/
      this.camera.position.x = 100;
      this.camera.position.y = 300;
      this.camera.position.z = 600;
      this.camera.lookAt(new Three.Vector3(400, 0, -300));
   },
   createRenderer: function(){
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setClearColor(new Three.Color(0xEEEEEE, 0.1));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMapEnabled = true;
   },
   createLight: function(){
      var spotLight = new Three.SpotLight(0xffffff);
      spotLight.position.set(-70, 170, 70);
      //this.scene.add(spotLight);
      //字体灯光
      var dirLight = new Three.DirectionalLight();
      dirLight.position.set(25, 23, 15);
      this.scene.add(dirLight);
      var dirLight2 = new Three.DirectionalLight();
      dirLight2.position.set(-25, 23, 15);
      this.scene.add(dirLight2);
      $('#WebGL-output').append(this.renderer.domElement);
   },
   //创建凸包
   createConvexGeometry: function(){
      var self = this;
      var points = [];
      for (var i = 0; i < 20; i++) {
          var randomX = -15 + Math.round(Math.random() * 30);
          var randomY = -15 + Math.round(Math.random() * 30);
          var randomZ = -15 + Math.round(Math.random() * 30);

          points.push(new Three.Vector3(randomX, randomY, randomZ));
      }

      self.spGroup = new Three.Object3D();
      var material = new Three.MeshBasicMaterial({color: 0xff0000, transparent: false});
      points.forEach(function (point) {

          var spGeom = new Three.SphereGeometry(0.2);
          var spMesh = new Three.Mesh(spGeom, material);
          spMesh.position.copy(point);
          self.spGroup.add(spMesh);
      });
      //self.scene.add(self.spGroup);

      var hullGeometry = new Three.ConvexGeometry(points);
      this.hullMesh = self.createBasicMesh(hullGeometry);
      //self.scene.add(this.hullMesh);
   },
   createLatheGeometry: function(segments, phiStart, phiLength) {
      var self = this;
      var points = [];
      var height = 5;
      var count = 30;
      for (var i = 0; i < count; i++) {
          points.push(new Three.Vector3((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 8, 0, ( i - count ) + count / 2));
      }

      self.spGroup = new Three.Object3D();
      var material = new Three.MeshBasicMaterial({color: 0xff0000, transparent: false});
      points.forEach(function (point) {

          var spGeom = new Three.SphereGeometry(0.2);
          var spMesh = new Three.Mesh(spGeom, material);
          spMesh.position.copy(point);
          self.spGroup.add(spMesh);
      });
      // add the points as a group to the scene
      //self.scene.add(self.spGroup);

      // use the same points to create a LatheGeometry
      var latheGeometry = new Three.LatheGeometry(points, segments, phiStart, phiLength);
      this.latheMesh = self.createNormalMesh(latheGeometry);

      //self.scene.add(this.latheMesh);
   },
   //拉伸创建几何体
   createExtrudeGeometry: function(){
      var self = this;
      var options = {
         amount: 10,
         bevelThickness: 5,
         bevelSize: 1,
         bevelSegments: 3,
         bevelEnabled: true,
         curveSegments: 30,
         steps:1
      };
      var geom = new Three.ExtrudeGeometry(self.drawShape(), options);
      this.extrude = self.createBasicMesh(geom);
      //self.scene.add(this.extrude);
   },
   //创建管道图形
   createTubeGeometry: function(){
      var self = this;
      var points = [];
      self.spGroup = new Three.Object3D();
      for(var i=0;i<5; i++){
         var randomX = -20 + Math.round(Math.random() * 50);
         var randomY = -15 + Math.round(Math.random() * 40);
         var randomZ = -20 + Math.round(Math.random() * 40);
         points.push(new Three.Vector3(randomX, randomY, randomZ));
      }
      var material = new Three.MeshBasicMaterial({color: 0xff0000, transparent: false});
      points.forEach(function (point) {

          var spGeom = new Three.SphereGeometry(0.2);
          var spMesh = new Three.Mesh(spGeom, material);
          spMesh.position.copy(point);
          self.spGroup.add(spMesh);
      });
      //self.scene.add(self.spGroup);
      var tubeGeometry = new Three.TubeGeometry(
         new Three.SplineCurve3(points), 60, 2, 10, false);
      this.tubeMesh = self.createBasicMesh(tubeGeometry);
      //self.scene.add(this.tubeMesh);
   },
   //SVG图形拉伸
   createSvgExtrude: function(){
      var self = this;
      var options = {
         amount: 2,
         bevelThickness: 2,
         bevelSize: 1,
         bevelSegments: 3,
         bevelEnabled: true,
         curveSegments: 30,
         steps:1
      };
      var geom = new Three.ExtrudeGeometry(self.getSvgPath(), options);
      this.extrudeSVG = self.createPhongMesh(geom);
      //self.scene.add(this.extrudeSVG);
   },
   //svg图形转化为shape对象
   getSvgPath: function(){
      var path = $('#batman-path').attr('d');
      var shape = transformSVGPathExposed(path);
      return shape;
   },
   //创建基于等式的几何体
   radialWave: function (u, v) {
      var r = 50;

      var x = Math.sin(u) * r;
      var z = Math.sin(v / 2) * 2 * r;
      var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;

      return new Three.Vector3(x, y, z);
   },
   createParamGeometry: function(){
      var self = this;
      var geom = new Three.ParametricGeometry(self.radialWave, 120, 120, false);
      this.paramMesh = self.createPhongMesh1(geom);
      //self.scene.add(this.paramMesh);
   },
   //创建字体
   ceateText: function(){
      var self = this;
      var options = {
         size: 90,
         height: 90,
         weight: 'normal',
         font: 'helvetiker',
         style: 'normal',
         bevelThickness: 2,
         bevelSize: 4,
         bevelSegments: 3,
         bevelEnabled: true,
         curveSegments: 12,
         steps: 1
      }
      var textGeom1 = new Three.TextGeometry('Learning', options);
      this.text1 = self.createPhongMesh1(textGeom1);
      this.text1.position.z = -100;
      this.text1.position.y = 100;
      self.scene.add(this.text1);
      var textGeom2 = new Three.TextGeometry('Three.js', options);
      this.text2 = self.createPhongMesh1(textGeom2);
      self.scene.add(this.text2);
   },
   createBasicMesh: function(geom){
      var meshMaterial = new Three.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
      //设置双面
      meshMaterial.side = Three.DoubleSide;
      var wireFrameMat = new Three.MeshBasicMaterial();
      //打开线框效果
      wireFrameMat.wireframe = true;
      //使用多种材质createMultiMaterialObject
      var plane = new Three.SceneUtils.createMultiMaterialObject(geom, 
         [meshMaterial, wireFrameMat]);
      return plane;
   },
   createNormalMesh: function(geom){
      var meshMaterial = new Three.MeshNormalMaterial();
      //设置双面
      meshMaterial.side = Three.DoubleSide;
      var wireFrameMat = new Three.MeshBasicMaterial();
      //打开线框效果
      wireFrameMat.wireframe = true;
      //使用多种材质createMultiMaterialObject
      var plane = new Three.SceneUtils.createMultiMaterialObject(geom, 
         [meshMaterial, wireFrameMat]);
      return plane;
   },
   createPhongMesh: function(geom){
      geom.applyMatrix(new Three.Matrix4().makeTranslation(-390, -74, 0));
      var meshMaterial = new Three.MeshPhongMaterial({color: 0x333333, shininess: 100, metal: true});
      var mesh = new Three.Mesh(geom, meshMaterial);
      mesh.scale.x = 0.1;
      mesh.scale.y = 0.1;

      mesh.rotation.z = Math.PI;
      mesh.rotation.x = -1.1;
      return mesh;
   },
   createPhongMesh1: function(geom){
      //geom.applyMatrix(new Three.Matrix4().makeTranslation(-25, 0, -25));
      var meshMaterial = new Three.MeshPhongMaterial({
          specular: 0xffffff,
          color: 0xeeffff,
          shininess: 100,
          metal: true
      });
      meshMaterial.side = Three.DoubleSide;
      var plane = Three.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
      return plane;
   },
   drawShape: function(){
      var shape = new Three.Shape();
      //将绘图点移动到指定的x,y坐标处
      shape.moveTo(10, 10);
      //函数从当前位置（例如由moveTo设定的位置）画一条线到指定的x,y坐标处
      shape.lineTo(10, 40);
      //定义三次曲线（定义曲线的2个坐标，终点）
      shape.bezierCurveTo(15, 25, 25, 25, 30, 40);
      //沿着提供的坐标绘制一条光滑的曲线
      shape.splineThru(
              [new Three.Vector2(32, 30),
                  new Three.Vector2(28, 20),
                  new Three.Vector2(30, 10),
              ]);
      //二次曲线（指定一点，端点）
      shape.quadraticCurveTo(20, 15, 10, 10);
      //画圆
      /*
         //ax,ay表示圆心位置相对于当前位置的偏移量
         arc(ax,ay,aRadius,aStartAngle,aEndAngle,aClockwise);
         //其位置表示绝对位置，而不是相对当前位置
         abcArc(ax,ay,aRadius,aStartAngle,aEndAngle,aClockwise)
         //ellipse函数可以分别指定x轴和y轴半径
         ellipse(ax,ay,xRadius,yRadius,aStartAngle,aEndAngle,aClockwise)
         abcEllipse(ax,ay,xRadius,yRadius,aStartAngle,aEndAngle,aClockwise)
      */
      var hole1 = new Three.Path();
      hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true);
      shape.holes.push(hole1);

      var hole2 = new Three.Path();
      hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true);
      shape.holes.push(hole2);

      var hole3 = new Three.Path();
      hole3.absarc(20, 16, 2, 0, Math.PI, true);
      shape.holes.push(hole3);

      return shape;
   },
   render: function(){
      var self = this;
      self.step += 0.01;
      self.spGroup.rotation.y = self.step;
      self.hullMesh.rotation.y = self.step;
      self.latheMesh.rotation.y = self.step;
      self.extrude.rotation.y = self.step;
      self.tubeMesh.rotation.y = self.step;
      self.extrudeSVG.rotation.y = self.step;
      self.paramMesh.rotation.y = self.step;
      self.paramMesh.rotation.x = self.step;
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   }
}
module.exports = CreateGeometry