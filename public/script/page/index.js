/*
*MeshLambertMaterial和MeshPhongMeterial对光源有反应
*MeshBasicMaterial对光源没反应
*************************
阴影产生：对于物体，如cube,sphere来说使用castShadow;
         对于plane来说要接受来自物体的投影，使用receiveShadow;
         对于光源来说，使用castShadow投出光源；
         这样才会产生投影
**************************
创建物体的步骤：以平面plane为例
1.创建物体PlaneGeometry，指定大小
2.创建物体的材质material（材质有多种）
3.创建平面：mesh(planeGeometry, material);
4.指定平面的位置;（对象的位置是相对于其父对象讲的，而父对象通常是你向其添加对象的那个场景）
5.设置阴影等（可选，根据需求设定）
6.添加到场景中
******************************
创建灯光：
1.创建灯光
2.设置位置
3.添加到场景中
*/
var $ = require('../lib/jquery-1.9.0.js');
var Three = require('../lib/three.js');
//创建场景
var scene = new Three.Scene();
//创建相机
var camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight,0.1,1000);
//创建渲染器（相当于画布）
var renderer = new Three.WebGLRenderer();
renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;//产生阴影
//创建坐标轴
var axes = new Three.AxisHelper(20);
scene.add(axes);
//创建灯光
var spotLight = new Three.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;//产生阴影
scene.add(spotLight);
//平面
var planeGeometry = new Three.PlaneGeometry(60, 20, 1, 1);
//var planeMaterial = new Three.MeshBasicMaterial({color: 0xcccccc});//这种材质对光源没反应
var planeMaterial = new Three.MeshLambertMaterial({color: 0xffffff});
var plane = new Three.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;//产生阴影
plane.rotation.x = -0.5*Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);
//立方体
var cubeGeometry = new Three.BoxGeometry(4,4,4);
//var cubeMaterial = new Three.MeshBasicMaterial({color: 0xff0000, wireframe: true});
var cubeMaterial = new Three.MeshLambertMaterial({color: 0xff0000});
var cube = new Three.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;//产生阴影
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);
//球体
var sphereGeometry = new Three.SphereGeometry(4,20,20);
//var sphereMaterial = new Three.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
var sphereMaterial = new Three.MeshLambertMaterial({color: 0x7777ff});
var sphere = new Three.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;//产生阴影
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
scene.add(sphere);
//相机位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);
//动画函数
var step = 0;
function renderScene(){
   //方块动画
   cube.rotation.x += 0.02;
   cube.rotation.y += 0.02;
   cube.rotation.z += 0.02;

   //弹跳球
   step += 0.04;
   sphere.position.x = 20+(10*Math.cos(step));
   sphere.position.y = 2+(10*Math.abs(Math.sin(step)));


   requestAnimationFrame(renderScene);
   renderer.render(scene, camera);
}
//画布添加到页面中
$('#WebGL-output').append(renderer.domElement);
//场景添加到画布中
//renderer.render(scene, camera);
//添加动画
renderScene();