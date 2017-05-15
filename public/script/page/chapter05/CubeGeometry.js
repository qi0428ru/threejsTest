/*
CubeGeometry现在被重命名为BoxGeometry
new Three.BoxGeometry(width, height, depth, widthSegments,heightSegments,depthSegments);
width:方块宽度；沿x轴方向的长度
height:方块高度；沿y轴方向的长度
depth:方块深度；沿z轴方向的长度
widthSegments:沿x轴方向，将面分成多少分，默认值为1；
heightSegments:沿y轴方向，将面分成多少分，默认值为1；
depthSegments:沿z轴方向，将面分成多少分，默认值为1；
*/
/*
SphereGeometry:球体
new Three.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
radius：设置球体的半径，决定最终网格有多大，默认值为50；
widthSegments：指定竖直方向上的分段数；段数越多，球体表面越光滑；默认值为8，最小值为3；
heightSegments：指定水平方向上的分段数；段数越多，球体表面越光滑；默认值为8，最小值为3；
phiStart：指定从x轴方向什么地方开始绘制。取值范围是0到2*PI,默认值为0
phiLength:该属性用来指定从phiStart开始画多少
thetaStart：指定从y轴方向什么地方开始绘制。取值范围是0到2*PI,默认值为0
thetaLength:该属性用来指定从thetaStart开始画多少
*/
/*
CylinderGeometry：圆柱体
new Three.CylinderGeometry(radiusTop,radiusBottom,height,segmentsX,segmentsY,openEnded);
radiusTop:圆柱顶部的尺寸，默认20；为负值时可以制成漏斗形状
radiusBottom:圆柱底部的尺寸，默认20；
height:设置圆柱的高度，默认100；
segmentsX:设置沿x轴分成多少段，默认是8.数字越大，圆柱越圆滑
segmentsX:设置沿x轴分成多少段，默认是1.分段越多，意味着面越多
openEnded:指定网格的底部和顶部是否封闭，默认是false(封闭)
*/
/*
TorusGeometry:圆环体
new Three.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
radius:完整圆环的尺寸
tube:设置管子的半径
TorusGeometry：沿圆环长度方向分成的段数(沿圆环的方向)
tubularSegments：沿圆环宽度方向分成的段数
arc:是否绘制一个完整的圆环；默认值为2*Math.PI
*/
/*
TorusKnotGeometry:圆环纽结
Three.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale);
radius:完整圆环的尺寸
tube:设置管子的半径
TorusGeometry：沿圆环长度方向分成的段数(沿圆环的方向)
tubularSegments：沿圆环宽度方向分成的段数
p:定义结的形状，默认值为2；
q:定义结的形状，默认值为3；
heightScale:这个属性可以拉伸环面纽结，默认值为1；
*/
/*
PolyhedronGeometry:自定义多边体
new Three.PolyhedronGeometry(vertices, faces, 10, 1);
vertices:设置构成多面体的顶点
faces:由vertices创建出的面
radius:指定多面体的大小
detail：决定每个面上三角形的个数
*/
/*
IcosahedronGeometry:正20面体
TetrahedronGeometry：正4面体
OctahedronGeometry：正8面体
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');

var CubeGeometry = {
   init: function(){
      this.step = 0;
      this.createScene();
      this.createCamera();
      this.createRenderer();
      this.createCube();//创建立方体
      this.createSphere();//创建三维球体
      this.createCylinder();//创建圆柱
      this.createTorus();//创建圆环体
      this.createKnotGeometry();//创建环面纽结
      this.createPolyGeom();//创建多面体
      this.createDefinedPoly();//自定义多面体
      this.createLight();
      this.render();
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
   //立方体
   createCube: function(){
      var self = this;
      var cubeGeom = new Three.BoxGeometry(10, 10, 10, 1, 1, 1);
      this.cube = self.createMesh(cubeGeom);
      //self.scene.add(self.cube);
   },
   //球体
   createSphere: function(){
      var self = this;
      var sphereGeom = new Three.SphereGeometry(16, 10, 10, 0, 2*Math.PI, 0, 0.3*Math.PI);
      this.sphere = self.createMesh(sphereGeom);
      //self.scene.add(this.sphere);
   },
   //圆柱
   createCylinder: function(){//创建圆柱
      var self = this;
      //漏斗
      var cylinderGeom = new Three.CylinderGeometry(-15,15,40,10,10,false);
      this.cylinder = self.createMesh(cylinderGeom);
      //self.scene.add(this.cylinder);
   },
   //圆环
   createTorus: function(){
      var self = this;
      var torusGeom = new Three.TorusGeometry(20, 4, 5, 10, Math.PI);
      this.torus = self.createMesh(torusGeom);
      //self.scene.add(this.torus);
   },
   //圆环纽结
   createKnotGeometry: function(){
      var self = this;
      var knotGeom = new Three.TorusKnotGeometry(10, 1, 80, 8, 12, 3, 3);
      this.knot = self.createMesh(knotGeom);
      //self.scene.add(this.knot);
   },
   //多面体
   createPolyGeom: function(){
      var self = this;
      /*
         参数为radius和detail
         radius：指定多面的大小
         detail:如果为1，这个多面体的每个三角形都会分成4个小三角形；
         如果设为2，那么那些4个小三角形中的每一个都会继续分成4个小三角形
      */
      //正20面体
      var polyGeom20 = new Three.IcosahedronGeometry(10, 0);
      //正四面体
      var polyGeom4 = new Three.TetrahedronGeometry(10, 0);
      //正八面体
      var polyGeom = new Three.OctahedronGeometry(10, 1);
      this.poly = self.createMesh(polyGeom);
      //self.scene.add(this.poly);
   },
   //自定义多边形
   createDefinedPoly: function(){
      var self = this;
      var vertices = [
         1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1
      ];
      var faces = [
         2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
      ];
      var polyGeom = new Three.PolyhedronGeometry(vertices, faces, 10, 1);
      this.polyDef = self.createMesh(polyGeom);
      self.scene.add(this.polyDef);
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
   render: function(){
      var self = this;
      self.step += 0.01;
      self.cube.rotation.y = self.step;
      self.sphere.rotation.y = self.step;
      self.cylinder.rotation.y = self.step;
      self.torus.rotation.y = self.step;
      self.knot.rotation.y = self.step;
      self.poly.rotation.y = self.step;
      self.polyDef.rotation.y = self.step;
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   }
}
module.exports = CubeGeometry;