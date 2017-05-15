var $ = require('../../lib/jquery-1.9.0.js');
var Three = require('../../lib/three.js');
var Chapter02One = {
   init: function(scene, plane, camera, renderer,planeGeometry){
      this.scene = scene;
      this.renderer = renderer;
      this.camera = camera;
      this.plane = plane;
      this.planeGeometry = planeGeometry;
      this.bindEvent();
      this.render();
   },
   bindEvent: function(){
      var self = this;
      $('.js-add').on('click', $.proxy(this.addCube, this));
      $('.js-remove').on('click', $.proxy(this.removeCube, this));
      $('.js-output').on('click', $.proxy(this.outputObject, this));
   },
   render: function(){
      var self = this;
      //traverse函数类似于for()；在场景的每一个子对象上调用一次
      self.scene.traverse(function (e) {
         if (e instanceof Three.Mesh && e != self.plane) {

            e.rotation.x += 0.02;
            e.rotation.y += 0.02;
            e.rotation.z += 0.02;
          }
      });

      // render using requestAnimationFrame
      requestAnimationFrame($.proxy(this.render, this));
      self.renderer.render(self.scene, self.camera);
   },
   addCube: function(){
      var self = this;
      var cubeSize = Math.ceil((Math.random()*3));//ceil向上取整
      var cubeGeometry = new Three.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var cubeMaterial = new Three.MeshLambertMaterial({color: Math.random()*0xffffff});
      var cube = new Three.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = 'cube-'+ self.scene.children.length;
      cube.position.x = -30 + Math.round((Math.random()*self.planeGeometry.parameters.width));//round四舍五入
      cube.position.y = Math.round((Math.random()*5));
      cube.position.z = -20 + Math.round((Math.random()*self.planeGeometry.parameters.height));
      self.scene.add(cube);//添加物体
      self.getChildName(cube.name);
   },
   removeCube: function(){
      var self = this;
      var allChildren = self.scene.children;
      var lastObject = allChildren[allChildren.length-1];
      if(lastObject instanceof Three.Mesh){
         self.scene.remove(lastObject);//移除物体
      }
   },
   outputObject: function(){
      var self = this;
      console.log(self.scene.children);//scene.childen所有子对象的列表
   },
   getChildName: function(name){
      var self = this;
      if(name){
         console.log(self.scene.getObjectByName(name));
      }
      
   }
}
module.exports = Chapter02One;

