/*
collada + KeyFrameAnimation

使用THREE.ColladaLoader实现动画的过程：
1.有一个包含场景动画的xml(.js)的文件
2.创建场景，load xml(js)文件,将文件的动作转化为KeyFrameAnimation动画
3.监听动作事件更新动画
注：更新动画的原理：
benchmarkAnimation：collada生成的对象的属性；
获取当前所处的时间，计算更新的参数，进行更新，注意，这里更新时要去设置timeScale,否则会根据默认的timeScale去更新。默认timeScale为0.0001
这样也就通过程序控制了xml文件的动画更新
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
*/

var jQuery = require('../../lib/jquery-1.9.0.js');
var THREE = require('../../lib/three.min.js');
require('../../lib/ColladaLoader.js');
require('../../lib/Animation.js');
require('../../lib/KeyFrameAnimation.js');
require('../../lib/AnimationHandler.js');
jQuery.fn.momentus = function(cfg) {
   var now = Date.now ||
   function() {
      return (new Date).valueOf()
   }, start_point = {
      x: 0,
      y: 0
   }, last_point = {
      x: 0,
      y: 0
   }, current_coords = {
      x: 0,
      y: 0
   }, last_coords = {
      x: 0,
      y: 0
   }, velocity = {
      x: 0,
      y: 0
   }, last_time = now(), inertia_time = last_time, mass = cfg.mass || 1e3, u = cfg.u || 4, wheel_ratio = cfg.wheelRatio || 1e3, mouse_ratio = cfg.mouseRatio || 20, touch_ratio = cfg.touchRatio || 2, on_change = cfg.onChange ||
   function() {}, frame_rate = cfg.frameRate || 60;

   function calculateVelocity(e) {
      var time = now(),
         delta_time = time - last_time,
         vel_x = velocity.x + last_coords.x / delta_time / (e.pageX ? mouse_ratio : touch_ratio),
         vel_y = velocity.y + last_coords.y / delta_time / (e.pageY ? mouse_ratio : touch_ratio);
      vel_x = !isNaN(vel_x) ? vel_x : 0;
      vel_y = !isNaN(vel_y) ? vel_y : 0;
      return {
         x: vel_x,
         y: vel_y
      }
   }
   var self = this;
   $(this).on("mousedown touchstart", function(e) {
      e.preventDefault();
      var x = e.pageX || e.originalEvent.touches[0].pageX,
         y = e.pageY || e.originalEvent.touches[0].pageY;
      last_coords = {
         x: 0,
         y: 0
      };
      start_point = {
         x: x,
         y: y
      };
      velocity = {
         x: 0,
         y: 0
      };
      on_change(current_coords, velocity);
      $("body").on("mousemove touchmove", function(e) {
         e.preventDefault();
         var vel = calculateVelocity(e);
         last_time = now();
         var x = e.pageX || e.originalEvent.touches[0].pageX,
            y = e.pageY || e.originalEvent.touches[0].pageY,
            delta_x = x - start_point.x,
            delta_y = y - start_point.y;
         last_point = start_point;
         start_point = {
            x: x,
            y: y
         };
         last_coords.x = delta_x;
         last_coords.y = delta_y;
         current_coords.x += delta_x;
         current_coords.y += delta_y;
         on_change(current_coords, vel);
         $(self).trigger("mousewheel")
      });
      $("body").on("mouseup touchend", function(e) {
         velocity = calculateVelocity(e);
         on_change(current_coords, velocity);
         inertia_time = null;
         $("body").off("mousemove touchmove mouseup touchend")
      })
   });
   $(this).on("wheel mousewheel", function(e) {
      if (velocity.x == 0 && velocity.y == 0) inertia_time = now();
      var delta_x, delta_y;
      if (e.originalEvent) {
         delta_x = e.originalEvent.deltaX || 0, delta_y = e.originalEvent.deltaY || 0
      } else {
         delta_x = 0, delta_y = 0
      }
      velocity.x -= delta_x / wheel_ratio;
      velocity.y -= delta_y / wheel_ratio
   });
   (function inertia() {
      velocity.x = !isNaN(velocity.x) ? velocity.x : 0;
      velocity.y = !isNaN(velocity.y) ? velocity.y : 0;
      if (!inertia_time) {
         inertia_time = now()
      } else if (velocity.x != 0 || velocity.y != 0) {
         var time = now(),
            force_x = velocity.x * u,
            force_y = velocity.y * u,
            acc_x = force_x / mass,
            acc_y = force_y / mass,
            delta_time = time - inertia_time,
            vel_x = velocity.x - acc_x * delta_time,
            vel_y = velocity.y - acc_y * delta_time;
         vel_x = !isNaN(vel_x) ? vel_x : 0;
         vel_y = !isNaN(vel_y) ? vel_y : 0;
         velocity.x = vel_x;
         velocity.y = vel_y;
         var delta_x = vel_x * delta_time,
            delta_y = vel_y * delta_time;
         last_coords.x = current_coords.x;
         last_coords.y = current_coords.y;
         current_coords.x += delta_x;
         current_coords.y += delta_y;
         inertia_time = time;
         on_change(current_coords, velocity)
      }
      if (window.requestAnimationFrame) {
         requestAnimationFrame(inertia)
      } else {
         setTimeout(inertia, 1e3 / frame_rate)
      }
   })();
   return this
};

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
var currentChapterIndex = chapterIndex = 0;
var loader = new THREE.ColladaLoader;
var wrapper = document.getElementById("kfa-wrapper");
var timeStampControl = false;
var timeScale = 1.2;
var createScollSensor = function(wrapper) {
   var scrollSensor = document.createElement("div");
   if (!wrapper) wrapper = document.body;
   scrollSensor.className = "kfa-scroll-sensor";
   scrollSensor.style.cssText = "position:absolute;width:100%;height:100%;z-index:2;top:0";
   wrapper.appendChild(scrollSensor);
   return scrollSensor
};
var progressCallback = function(innerChapterIndex, progress){
   /*if (chapterIndex === 0) {
      if (progress < 5 && progress > .5) {
         msgop.fadeOut()
      } else if (progress < .5) {
         msgop.fadeIn()
      }
   } else if (chapterIndex === 4) {
      if (progress > 4 && progress < 7.6) {
         msgmsn.fadeIn()
      } else {
         msgmsn.fadeOut()
      }
   }
   if (progress > edtime) {
      edlay.fadeIn(600)
   } else {
      edlay.fadeOut(600)
   }*/
}
var textureLoadingCallback = function(item, loaded, total) {}
var scrollCallback = function(deltaY){}
var scrollSensor = createScollSensor();
function initRenderer(callback) {
   container = document.createElement("div");
   wrapper.appendChild(container);
   container.className = "chapter";
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
         bindEventListeners();
      })
   });
}

function isMobile() {
   var isMob = false;
   if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMob = true;
   return isMob
}
function getParam(progress) {
   //console.log('=======', progress);
   var isMob = isMobile();
   var isOpera = !! window.opr && !! opr.addons || !! window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
   var isFirefox = typeof InstallTrigger !== "undefined";
   var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0;
   var isIE = false || !! document.documentMode;
   var isEdge = !isIE && !! window.StyleMedia;
   var isChrome = !! window.chrome && !! window.chrome.webstore;
   var isBlink = (isChrome || isOpera) && !! window.CSS;
   if (!isMob) {
      if (isFirefox) {
         return progress.toFixed(2) * -.1
      }
      return progress.toFixed(2) * -.01
   } else {
      //console.log('-----', progress);
      if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
         return progress.toFixed(2) * -.005
      }
      return progress.toFixed(2) * -.01
   }
}
function initScene(chapter, callback) {
   var scene = new THREE.Scene;
   chapter.kfAnimations = [];
   var longestAnimationLength = 0;
   for (var i = 0; i < chapter.kfAnimationsLength; ++i) {
      var animation = chapter.animations[i];
      var kfAnimation = new THREE.KeyFrameAnimation(animation);
      kfAnimation.loop = false;
      kfAnimation.timeScale = timeScale;
      chapter.kfAnimations.push(kfAnimation);
      if (animation.length > longestAnimationLength) {
         //console.log(kfAnimation)
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
   if (Math.abs(deltaY) > 10) return;
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
function bindEventListeners() {
   var lastTimestamp = 0;
   $(scrollSensor).momentus({
      onChange: function(coords) {
         stopAnimation();
         var progress = coords.y - lastTimestamp;
         var param = getParam(progress);
         update(param);
         if (scrollCallback) {
            scrollCallback.call(window, coords.y)
         }
         if (progressCallback) {
            progressCallback.call(window, currentChapterIndex, currentChapter.benchmarkAnimation.currentTime)
         }
         lastTimestamp = coords.y
      }
   })
}
function loadModel(chapter, callback) {

   var self = this;
   var modelPath = chapter.model_path;
   var texturePath = chapter.texture_path;
   var textureDict = chapter.texture_dict;
   console.log(loader)
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
            textureLoadingCallback.call(window, item, loaded, total)
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
renderer = renderer;
