var $ = require('../../lib/jquery-1.9.0.js');
var THREE = require('../../lib/three.js');
require('../../lib/ColladaLoader.js');

var gngs_dict = {
   "材质.35": "liuchuanfeng-b.png",
   "材质.34": "liuchuanfeng-a.png",
   "材质.33": "yingmu-a.png",
   "材质.32": "liuchuanfeng-b.png",
   "材质.31": "chimu-a.png",
   "材质.30": "chimu-b.png",
   "材质.29": "yingmu-b.png",
   "材质.2": "basketball.png",
   "材质.28": "bj6.png",
   "材质.27": "bj5.png",
   "材质.26": "bj4.png",
   "材质.25": "bj3.png",
   "材质.24": "bj2.png",
   "材质.23": "bj1.png",
   "材质.22": "lcb2.png",
   "材质.21": "lcb1.png",
   "材质.20": "cms.png",
   "材质.19": "liuchuangfeng-qiu.png",
   "材质.18": "7.png",
   "材质.17": "6.png",
   "材质.16": "5_1.png",
   "材质.15": "4_1.png",
   "材质.14": "3.png",
   "材质.13": "1_1.png",
   "材质.12": "yingmuq.png",
   "材质.11": "sanjing.png",
   "材质.10": "sanbei2.png",
   "材质.9": "sanbei1.png",
   "材质.8": "cmq.png",
   "材质.7": "篮球后直线背景.png",
   "材质.6": "gb3.png",
   "材质.5": "gb2.png",
   "材质.4": "gb1.png",
   "材质.3": "gc.png",
   "材质.1": "2_1.png"
};
var chapter = {
   model_path: "http://img5.cache.netease.com/utf8/3g/kfa-swiper/events/childrens-day-2017/asset/gngs.js",
   texture_path: "http://img5.cache.netease.com/utf8/3g/kfa-swiper/events/childrens-day-2017/asset/texture/gngs/",
   audio_file: "http://c.m.163.com/nc/qa/activity/kfa-swiper/events/childrens-day-2017/asset/mp3/gngs_bgm.mp3",
   texture_dict: gngs_dict,
   camera_fov: 80,
   camera_far: 8e3,
   bgcolor: 15658734,
   length: 24
}
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var defaultCameraFov = 70;
var defaultCameraNear = 10;
var defaultCameraFar = 6e3;
var renderer;
var currentChapter = null;
var loader = new THREE.ColladaLoader;
function initRenderer(callback) {
   var container = document.getElementById("WebGL-output");
   //container.className = "chapter";
   renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true
   });
   //renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   container.appendChild(renderer.domElement);
   if (callback) callback.call()
}
function init() {
   initRenderer();
   loadModel(chapter, function() {
      self.currentChapter = currentChapter = chapter;
      if (currentChapter.bgcolor !== undefined) {
         renderer.setClearColor(currentChapter.bgcolor, 1)
      }
      initScene(chapter, function() {
         window.scene = currentChapter.scene;
         start();
      })
   });
}
function initScene(chapter, callback) {
   var scene = new THREE.Scene;
   chapter.kfAnimations = [];
   var longestAnimationLength = 0;
   for (var i = 0; i < chapter.kfAnimationsLength; ++i) {
      var animation = chapter.animations[i];
      var kfAnimation = new THREE.KeyFrameAnimation(animation);
      kfAnimation.loop = false;
      //kfAnimation.timeScale = timeScale;
      chapter.kfAnimations.push(kfAnimation);
      if (animation.length > longestAnimationLength) {
         chapter.benchmarkAnimation = kfAnimation;
         longestAnimationLength = animation.length
      }
   }
   scene.add(chapter.model);
   var light = new THREE.AmbientLight(16777215);
   light.name = "scene-ambient-light";
   scene.add(light);
   chapter.model.traverse(function(child) {
      if (child instanceof THREE.PerspectiveCamera) {
         var camera = child;
         camera.fov = chapter.camera_fov || defaultCameraFov;
         camera.far = chapter.camera_far || defaultCameraFar;
         camera.near = chapter.camera_near || defaultCameraNear;
         chapter.camera = camera;
         camera.aspect = windowHalfX / windowHalfY;
         camera.updateProjectionMatrix()
      }
   });
   if (chapter.camera === undefined) {
      chapter.camera = new THREE.PerspectiveCamera(chapter.camera_fov, window.innerWidth / window.innerHeight, chapter.camera_near, chapter.camera_far);
      chapter.camera.name = "mycamera"
   }
   chapter.scene = scene;
   if (callback) callback.call()
}
function start() {
   for (var i = 0; i < currentChapter.kfAnimationsLength; ++i) {
      var animation = currentChapter.kfAnimations[i];
      for (var h = 0, hl = animation.hierarchy.length; h < hl; h++) {
         var keys = animation.data.hierarchy[h].keys;
         var sids = animation.data.hierarchy[h].sids;
         var obj = animation.hierarchy[h];
         if (keys.length && sids) {
            for (var s = 0; s < sids.length; s++) {
               var sid = sids[s];
               var next = animation.getNextKeyWith(sid, h, 0);
               if (next) next.apply(sid)
            }
            obj.matrixAutoUpdate = false;
            animation.data.hierarchy[h].node.updateMatrix();
            obj.matrixWorldNeedsUpdate = true
         }
      }
      animation.play()
   }
   update(0)
}
function climp(n, min, max) {
   if (n < min) {
      return min
   } else if (n > max) {
      return max
   } else {
      return n
   }
}
function update(deltaY) {
   /*if (timeStampControl) {
      var deltaY = clock.getDelta()
   }
   if (chapterChanging) {
      return
   }
   var clock = new THREE.Clock
   var deltaY = clock.getDelta()
   if (Math.abs(deltaY) > 10) return;*/
   var current = currentChapter.benchmarkAnimation.currentTime;
   var length = currentChapter.benchmarkAnimation.data.length;
   var deltaFrameTime = 0;
   var deltaFrameTime = climp(deltaY, 0 - current, currentChapter.benchmarkAnimation.data.length - current);
   currentChapter.benchmarkAnimation.update(deltaFrameTime);
   for (var i = 0; i < currentChapter.kfAnimationsLength; ++i) {
      if (current < currentChapter.kfAnimations[i].data.length) {
         currentChapter.kfAnimations[i].currentTime = currentChapter.benchmarkAnimation.currentTime;
         currentChapter.kfAnimations[i].update(0)
      }
   }
   startAnimation();
   renderer.render(currentChapter.scene, currentChapter.camera)
}
var initialized = false;
var requestId;

function loop() {
   requestId = window.requestAnimationFrame(tempReq)
}
function startAnimation() {
   if (!requestId && !initialized) {
      initialized = true;
      loop()
   }
}
function stopAnimation() {
   if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = undefined
   }
}
var tempReq = function() {
      update(0);
      loop()
   };

function loadModel(chapter, callback) {
   var self = this;
   var modelPath = chapter.model_path;
   var texturePath = chapter.texture_path;
   var textureDict = chapter.texture_dict;
   loader.load(modelPath, function(collada) {
      var model = collada.scene;
      chapter.animations = collada.animations;
      chapter.kfAnimationsLength = collada.animations.length;
      chapter.model = model;
      model.scale.x = model.scale.y = model.scale.z = 1;
      if (texturePath) {
         var manager = new THREE.LoadingManager;
         manager.onProgress = function(item, loaded, total) {
            /*if (loadingText && loadedIndex === 0) {
               percentage.innerText = 50 + parseInt(loaded / total * 100 / 2)
            }*/
            //textureLoadingCallback.call(window, item, loaded, total)
         };
         var loader = new THREE.ImageLoader(manager);
         loader.crossOrigin = true;
         var children = collada.scene.children || [];
         processArray(children);

         function processArray(array) {
            var forbiddenNames = ["Light", "Plane", "Camera", "Nullo"];
            var transparent = [];
            for (var i = 0; i < array.length; i++) {
               var name = array[i].name.toLowerCase();
               if ($.inArray(name, forbiddenNames) < 0) {
                  var object = array[i];
                  if (name.indexOf("group") > -1) {
                     processArray(object.children || [])
                  } else {
                     if (name) {
                        loadAlpha(name, object)
                     }
                  }
               }
               if ($.inArray(name, transparent) >= 0) {
                  var object = model.getObjectByName(name, true)
               }
            }
         }
         function loadAlpha(name, object) {
            var mesh = object.children[0];
            if (mesh instanceof THREE.Mesh) {
               var material = mesh.material;
               var texture_img = textureDict[material.name];
               console.log(texture_img)
               if (!texture_img) return;
               var file = texturePath + texture_img,
                  alpha = new THREE.Texture;
               material.map = alpha;
               material.transparent = true;
               material.side = THREE.DoubleSide;
               loader.load(file, function(image) {
                  alpha.image = image;
                  alpha.needsUpdate = true
               })
            }
         }
      }
      callback.call()
   })
}
init();
