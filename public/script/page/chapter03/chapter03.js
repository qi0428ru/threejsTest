/*
光源：
基础光源
AmbientLight（环境光）:基础光源，颜色会添加到整个场景和所有对象的当前颜色上；
PointLight(点光源)：空间中的一点，朝所有的方向发射光线；
SpotLight(聚光灯光源)：这种光源有聚光灯的效果，类似台灯
DirectionalLight(方向光)：无线光，这种光源发出的光线是平行的
特殊光源
HemisphereLight(半球光)：特殊光源，用来创建更加自然的室外光线
AreaLight(面光源)：指定散发光源的平面，而不是空间中的一点
LensFlare(镜头眩光)：这不是一种光源，但是可以为场景中的光源添加眩光效果
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
var invert = 1;
var phase = 0;
//创建场景
var scene = new Three.Scene();
scene.fog = new Three.Fog(0xaaaaaa, 0.010, 200);
//创建相机
var camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight,0.1,1000);
//相机位置
camera.position.x = -20;
camera.position.y = 15;
camera.position.z = 45;
camera.lookAt(new Three.Vector3(10, 0, 0));
//创建渲染器（相当于画布）
var renderer = new Three.WebGLRenderer({antialias: true, alpha: true});
renderer.setClearColor(new Three.Color(0xaaaaff, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;//产生阴影

//创建灯光
//AmbientLight（环境光）光源不需要指定位置
//不能将AmbientLight（环境光）作为场景中的唯一光源。
//在使用其他光源的同时使用AmbientLight（环境光）,目的是弱化阴影或添加一些颜色
var ambientLight = new Three.AmbientLight('#007700');
scene.add(ambientLight);
//使用Three.Color()对象改变颜色
ambientLight.color = new Three.Color('#1C1C1C');

//点光源PointLight
//属性：color,intensity,distance,position,visible
//光线的亮度不会随着距离的增加而递减
var pointLight = new Three.PointLight('#ccffcc');
pointLight.distance = 100;
pointLight.intensity = 1;
//scene.add(pointLight);
var sphereLight = new Three.SphereGeometry(0.2);
var sphereLightMaterial = new Three.MeshBasicMaterial({color: 0xac6c25});
var sphereLightMesh = new Three.Mesh(sphereLight, sphereLightMaterial);
sphereLightMesh.castShadow = true;

sphereLightMesh.position = new Three.Vector3(3, 0, 3);
//scene.add(sphereLightMesh);


//平面
var planeGeometry = new Three.PlaneGeometry(1000, 200, 20, 20);
//var planeMaterial = new Three.MeshBasicMaterial({color: 0xcccccc});//这种材质对光源没反应
var planeMaterial = new Three.MeshLambertMaterial({color: 0xffffff});
var plane = new Three.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;//产生阴影
plane.rotation.x = -0.5*Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);
/*添加纹理的面板
var textureGrass = Three.ImageUtils.loadTexture("../../../image/page/grasslight-big.jpg");
textureGrass.wrapS = Three.RepeatWrapping;
textureGrass.wrapT = Three.RepeatWrapping;
textureGrass.repeat.set(4, 4);


var planeGeometry = new Three.PlaneGeometry(1000, 200, 20, 20);
var planeMaterial = new Three.MeshLambertMaterial({map: textureGrass});
var plane = new Three.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

// rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

// add the plane to the scene
scene.add(plane);*/
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

//聚光灯光源（具有锥形效果）
var spotLight = new Three.SpotLight(0xcccccc);
spotLight.position.set(-40, 60, -10);
//spotLight.castShadow = true;//产生阴影
spotLight.target = plane;//决定光照方向
scene.add(spotLight);

//平行光
var directionalLight = new Three.DirectionalLight('#ffffff');
directionalLight.position.set(30, 10, -50);
directionalLight.castShadow = true;
directionalLight.target = plane;
//设置投影的效果
directionalLight.distance = 0;
directionalLight.shadowCameraNear = 2;
directionalLight.shadowCameraFar = 200;
directionalLight.shadowCameraLeft = -100;
directionalLight.shadowCameraRight = 100;
directionalLight.shadowCameraTop = 100;
directionalLight.shadowCameraBottom = -100;
directionalLight.shadowMapWidth = 2048;
directionalLight.shadowMapHeight = 2048;

scene.add(directionalLight);
//半球光光源
//参数分别为：接收自地面的颜色，来自上方的颜色，以及光照强度
var hemiLight = new Three.HemisphereLight(0x704c09, 0xff0000, 0.6);
hemiLight.position.set(0, 500, 0);
//scene.add(hemiLight);
//平面光光源AreaLight使用Three.WebGLDeferedRenderer对象渲染

//镜头眩光
//创建render时要使用var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
//属性分别为：纹理，尺寸，距离，融合模式，颜色
//**注：此处使用Three.Color()创建颜色才能出现眩光的效果，直接在LensFlare中使用颜色值是没有效果的
var flareColor = new Three.Color(0xffaacc);
var background = Three.ImageUtils.loadTexture('../../../image/page/lensflare0.png');
var textureFlare3 = Three.ImageUtils.loadTexture('../../../image/page/lensflare3.png');
var lensFlare = new Three.LensFlare(background, 350, 0.0, Three.AdditiveBlending, flareColor);
lensFlare.add(textureFlare3, 60, 0.6, Three.AdditiveBlending);
lensFlare.add(textureFlare3, 70, 0.7, Three.AdditiveBlending);
lensFlare.add(textureFlare3, 120, 0.9, Three.AdditiveBlending);
lensFlare.add(textureFlare3, 70, 1.0, Three.AdditiveBlending);
lensFlare.position.copy(directionalLight.position);
scene.add(lensFlare);

//动画函数
var step = 0;
function renderScene(){
   //方块动画
   cube.rotation.x += 0.02;
   cube.rotation.y += 0.02;
   cube.rotation.z += 0.02;

   //弹跳球
   step += 0.03;
   sphere.position.x = 20+(10*Math.cos(step));
   sphere.position.y = 2+(10*Math.abs(Math.sin(step)));
   //点光源移动start
   if (phase > 2 * Math.PI) {
       invert = invert * -1;
       phase -= 2 * Math.PI;
   } else {
       phase += 0.03;
   }
   sphereLightMesh.position.z = +(7 * (Math.sin(phase)));
   sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
   sphereLightMesh.position.y = 5;

   if (invert < 0) {
       var pivot = 14;
       sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
   }

   pointLight.position.copy(sphereLightMesh.position);
   //点光源移动end
   requestAnimationFrame(renderScene);
   renderer.render(scene, camera);
}
//画布添加到页面中
$('#WebGL-output').append(renderer.domElement);
//场景添加到画布中
//renderer.render(scene, camera);
//添加动画
renderScene();