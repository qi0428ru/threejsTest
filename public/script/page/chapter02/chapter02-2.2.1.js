/*
1.使用多个材质createMultiMaterialObject,创建mesh对象；
2.相机：PerspectiveCamera表示的是透视相机：距离相机越远的方块，被渲染的越小
        OrthographicCamera表示的是正投影相机：所有方块渲染出来的尺寸都一样
-------------------------------------------------------------------------
PerspectiveCamera的参数：
1.fov(视场)：从相机位置能看到的部分场景，大多数情况下会用到60到90度左右的视场，默认值45度
2.aspect(长宽比)：渲染结果输出区的横向长度和纵向长度的比值。默认值为window.innerWidth/window.innerHeight
3.near(近面)：从距离相机多近的地方开始渲染场景。默认值为0.1
4.far(远面)：相机可以从它所处的位置看多远。默认值为1000
------------------------------------------------------------------------
OrthographicCamera的参数：
left(左边界)：可视范围的左平面。可渲染部分的左侧边界
right(右边界)：可视范围的右边界。可渲染部分的右侧边界。
top(上边界)：可被渲染空间的最上面
bottom(下边界)：可被渲染空间的最下面
near(近面)：基于相机所在的位置，从这一点开始渲染场景
far(远面)：基于相机所在的位置，一直渲染到场景中的这一点
*/
var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
var Chapter02Sencond = {
   init: function(scene, plane, camera,renderer,planeGeometry){
      this.scene = scene;
      this.plane = plane;
      this.camera = camera;
      this.renderer = renderer;
      this.planeGeometry = planeGeometry;
      this.mesh = null;
      this.step = 0;
      this.lookAtMesh = null;
      this.bindEvent();
      this.initObject();
      this.initCube();
      this.render();
   },
   bindEvent: function(){
      $('.js-clone').on('click', $.proxy(this.clone, this));
      $('.js-switch').on('click', $.proxy(this.switchCamera, this));
   },
   initObject: function(){
      var self = this;
      var vertices = [
            new Three.Vector3(1, 3, 1),
            new Three.Vector3(1, 3, -1),
            new Three.Vector3(1, -1, 1),
            new Three.Vector3(1, -1, -1),
            new Three.Vector3(-1, 3, -1),
            new Three.Vector3(-1, 3, 1),
            new Three.Vector3(-1, -1, -1),
            new Three.Vector3(-1, -1, 1)
        ];

        var faces = [
            new Three.Face3(0, 2, 1),//0,2,1表示vertices数组中的额索引
            new Three.Face3(2, 3, 1),
            new Three.Face3(4, 6, 5),
            new Three.Face3(6, 7, 5),
            new Three.Face3(4, 5, 1),
            new Three.Face3(5, 0, 1),
            new Three.Face3(7, 6, 2),
            new Three.Face3(6, 3, 2),
            new Three.Face3(5, 7, 0),
            new Three.Face3(7, 2, 0),
            new Three.Face3(1, 3, 4),
            new Three.Face3(3, 6, 4),
        ];

        var geom = new Three.Geometry();
        geom.vertices = vertices;
        geom.faces = faces;
        geom.computeFaceNormals();


        var materials = [
            new Three.MeshLambertMaterial({opacity: 0.6, color: 0x44ff44, transparent: true}),
            new Three.MeshBasicMaterial({color: 0x000000, wireframe: true})

        ];

        //使用多个材质createMultiMaterialObject
        self.mesh = Three.SceneUtils.createMultiMaterialObject(geom, materials);
        self.mesh.children.forEach(function (e) {
            e.castShadow = true
        });
        //改变mesh数组中一个网格对象的位置，可以看到2个单独的对象
        self.mesh.children[0].translateX(0.5);
        self.mesh.children[0].translateZ(0.5);

        self.scene.add(self.mesh);
        //小球体的展示位置就是相机所在的位置
        var lookAtGeom = new Three.SphereGeometry(2);
        var lookAtMaterial = new Three.MeshLambertMaterial({color: 0xff0000});
        self.lookAtMesh = new Three.Mesh(lookAtGeom, lookAtMaterial);
        self.scene.add(self.lookAtMesh);
   },
   initCube: function(){
      var self = this;
      var cubeGeometry = new Three.BoxGeometry(4,4,4);
      var cubeMaterial = new Three.MeshLambertMaterial({color: 0x00ee22})
      for(var j=0;j<(self.planeGeometry.parameters.height/5);j++){
         for(var i=0;i<(self.planeGeometry.parameters.width/5);i++){
            var cube = new Three.Mesh(cubeGeometry, cubeMaterial);
            cube.position.z = -((self.planeGeometry.parameters.height)/2)+2+(j*5);
            cube.position.x = -((self.planeGeometry.parameters.width)/2)+2+(i*5);
            cube.position.y = 2;
            self.scene.add(cube);
         }
      }
      //小球体的展示位置就是相机所在的位置
      var lookAtGeom = new Three.SphereGeometry(2);
      var lookAtMaterial = new Three.MeshLambertMaterial({color: 0xff0000});
      self.lookAtMesh = new Three.Mesh(lookAtGeom, lookAtMaterial);
      self.scene.add(self.lookAtMesh);
   },
   switchCamera: function(){
      var self = this;
      if(self.camera instanceof Three.PerspectiveCamera){
         self.camera = new Three.OrthographicCamera(window.innerWidth/-16, 
            window.innerWidth/16, window.innerHeight/16, window.innerHeight/-16,-200,500);
         self.camera.position.x = 120;
         self.camera.position.y = 60;
         self.camera.position.z = 180;
         self.camera.lookAt(self.scene.position);
      }else{
         self.camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight
            ,0.1,1000);
         self.camera.position.x = 120;
         self.camera.position.y = 60;
         self.camera.position.z = 180;
         self.camera.lookAt(self.scene.position);
      }
      self.render();
   },
   clone: function(){
      var self = this;
      var cloneObj = self.mesh.children[0].geometry.clone();//children的长度为2
      var materials = [
            new Three.MeshLambertMaterial({opacity: 0.6, color: 0xff44ff, transparent: true}),
            new Three.MeshBasicMaterial({color: 0x000000, wireframe: true})

      ];
      var mesh2 =Three.SceneUtils.createMultiMaterialObject(cloneObj, materials);
        mesh2.children.forEach(function (e) {
            e.castShadow = true
        });
      mesh2.name = 'clone';
      mesh2.translateX(5);
      mesh2.translateZ(5);
      self.scene.remove(self.scene.getObjectByName('clone'));

      self.scene.add(mesh2);
      self.render();
   },
   render: function(){
      var self = this;
      self.step += 0.02;
      if (self.camera instanceof Three.Camera) {
          var x = 10 + ( 100 * (Math.sin(self.step)));
          self.camera.lookAt(new Three.Vector3(x, 10, x));
          self.lookAtMesh.position.copy(new Three.Vector3(x, 10, x));
      }
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
      //requestAnimationFrame($.proxy(this.render, this));
      //self.renderer.render(self.scene, self.camera);
   },
}
module.exports = Chapter02Sencond;