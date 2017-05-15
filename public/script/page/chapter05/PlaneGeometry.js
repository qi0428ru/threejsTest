/*
PlaneGeometry:创建非常简单的二维矩形
new Three.PlaneGeometry(width, height, widthSegments, heightSegments)
width:表示矩形的宽度；
height:表示矩形的高度
widthSegments:表示矩形的宽度应该划分为几段
heightSegments:表示矩形的高度应该划分为几段
*/
/*
CircleGeometry:创建出简单的二维圆（部分圆）
new Three.CircleGeometry(radius, segments, thetaStart, thetaLength)
radius:定义圆的半径，从而决定圆的大小。
segments:创建圆所用面的数量，最少3个，没有指定的话，默认8个。值越大，创建出的圆越光滑
thetaStart:定义从哪里开始画圆。值的范围是0到2*PI;
thetaLength:该属性定义圆要画多大。如果没有指定，默认为2*PI(整圆)
*/
/*
Shape对象的函数：
createPointsGeometry：表示将图形转化为一个点集，属性divisions定义返回点的数目，
这个值越高，返回的点越多，最终曲线也就越平滑。这个divisions分别应用到路径的每一部分
createSpacedPointsGeometry:表示将图形转换为一个点集，
但是，分段数是一次性的应用到整个路径上
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');

var PlaneGeometry = {
   init: function(){
      this.step = 0;
      this.createScene();
      this.createCamera();
      this.createRenderer();
      this.createPlane();//矩形
      this.createCircle();//圆
      this.createShape();//自定义图形
      this.createLight();
      this.render();
      this.bindEvent();
   },
   createScene: function(){
      this.scene = new Three.Scene();
   },
   createCamera: function(){
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera.position.x = -30;
      this.camera.position.y = 70;
      this.camera.position.z = 70;
      this.camera.lookAt(new Three.Vector3(10, 0, 0));
   },
   createRenderer: function(){
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setClearColor(new Three.Color(0xEEEEEE, 0.1));
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMapEnabled = true;
   },
   createLight: function(){
      var spotLight = new Three.SpotLight(0xffffff);
      spotLight.position.set(-40, 60, 10);
      this.scene.add(spotLight);
      $('#WebGL-output').append(this.renderer.domElement);
   },
   bindEvent: function(){
      $('.js-createLine').on('click', $.proxy(this.changeLineObject, this));
   },
   createPlane: function(){
      var self = this;
      var boxGeom = new Three.PlaneGeometry(10, 14, 4, 4);
      this.plane = self.createMesh(boxGeom);
      //this.scene.add(this.plane);
   },
   createCircle: function(){
      var self = this;
      var circleGeom = new Three.CircleGeometry(4, 10, 0.3 * Math.PI * 2);
      this.circle = self.createMesh(circleGeom);
      //this.scene.add(this.circle);
   },
   createShape: function(){
      var self = this;
      var shapeGeom = new Three.ShapeGeometry(self.drawShape());
      this.shapeObj = self.createMesh(shapeGeom);
      self.scene.add(this.shapeObj);
   },
   createMesh: function(geom){
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
   createLine: function(shape, spaced){
      if (!spaced) {
          var mesh = new Three.Line(shape.createPointsGeometry(10), new Three.LineBasicMaterial({
              color: 0xff3333,
              linewidth: 2
          }));
          return mesh;
      }
   },
   changeLineObject: function(){
      var self = this;
      self.scene.remove(self.shapeObj);
      self.shapeObj = self.createLine(self.drawShape(), false);
      self.scene.add(self.shapeObj);
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
      this.plane.rotation.y = self.step;
      this.circle.rotation.y = self.step;
      this.shapeObj.rotation.y = self.step;
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   }
}
module.exports = PlaneGeometry;