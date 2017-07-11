var THREE = require('../../lib/three.min.js');
require('../../lib/OBJLoader.js');
var app = {
   speed3d: !1,
   stopNian: !1,
   stopSnow: !1,
   stageLevel: 0,
   stageAniChangeTimes: 2.5,
   $stage: document.querySelectorAll(".stage"),
   $musicBtn: document.querySelectorAll(".music-btn")[0],
   $musicPlayer: document.getElementById("music"),
   bgGroup: ["/textures/stage_1_0.png", "/textures/stage_2_0.png", "/textures/stage_3_0.png", "/textures/stage_4_0.png", "/textures/title_0_0.png", "/textures/title_0_1.png", "/textures/title_0_2.png", "/textures/title_0_3.png", "/textures/title_0_4.png", "/textures/title_0_5.png", "/textures/stage_1_2.png", "/textures/stage_1_11.png", "/textures/stage_2_1.png", "/textures/stage_3_1.png", "/textures/stage_4_1.png", "/textures/line_fix_0.png", "/textures/line_fix_1.png", "/textures/line_fix_2.png", "/textures/dot.png", "/textures/stage_1_3.png", "/textures/stage_1_5.png", "/textures/stage_1_4.png", "/textures/stage_2_12.png", "/textures/stage_2_13.png", "/textures/stage_2_11.png", "/textures/stage_2_10.png", "/textures/stage_2_9.png", "/textures/stage_2_8.png", "/textures/stage_2_7.png", "/textures/stage_2_6.png", "/textures/stage_2_5.png", "/textures/stage_2_3.png", "/textures/stage_2_4.png", "/textures/stage_2_14.png", "/textures/stage_3_3.png", "/textures/stage_3_2.png", "/textures/stage_3_5.png", "/textures/stage_4_7.png", "/textures/stage_4_6.png", "/textures/stage_4_4.png", "/textures/stage_4_3.png", "/textures/stage_4_5.png", "/textures/stage_1_1.png", "/textures/stage_0_0.png", "/textures/nian_bg.png", "/textures/nian_text.png", "/textures/stage_5_0.png", "/textures/stage_5_1.png", "/textures/strokes_0.png", "/textures/strokes_1.png", "/textures/strokes_1_1.png", "/textures/strokes_2.png", "/textures/strokes_2_1.png", "/textures/strokes_3.png", "/textures/strokes_3_1.png", "/textures/stage6/logo_0.png", "/textures/stage6/board_2006.png", "/textures/stage6/logo_3.png", "/textures/stage6/board_2009.png", "/textures/stage6/board_2010.png", "/textures/stage6/logo_5.png", "/textures/stage6/board_2011.png", "/textures/stage6/logo_7.png", "/textures/stage6/logo_8.png", "/textures/stage6/logo_29.png", "/textures/stage6/logo_30.png", "/textures/stage6/board_2013.png", "/textures/stage6/logo_9.png", "/textures/stage6/logo_10.png", "/textures/stage6/board_2015_1.png", "/textures/stage6/logo_27.png", "/textures/stage6/logo_13.png", "/textures/stage6/logo_25.png", "/textures/stage6/logo_26.png", "/textures/stage6/board_2016_1.png", "/textures/stage6/logo_15.png", "/textures/stage6/logo_1.png", "/textures/stage6/logo_24.png", "/textures/stage6/logo_14.png", "/textures/stage6/board_2017.png", "/textures/stage6/logo_23.png", "/textures/stage6/logo_28.png", "/textures/stage6/board_2012.png", "/textures/stage6/logo_16.png", "/textures/stage6/logo_17.png", "/textures/stage6/board_2008.png", "/textures/stage6/logo_18.png", "/textures/stage6/board_2007.png", "/textures/stage6/logo_19.png", "/textures/stage6/logo_20.png", "/textures/stage6/board_2003.png", "/textures/stage6/logo_21.png", "/textures/stage6/board_2004.png", "/textures/stage6/logo_31.png", "/textures/stage6/board_2002_1.png", "/textures/stage6/logo_33.png", "/textures/stage6/logo_32.png", "/textures/stage6/board_2000_1.png", "/textures/stage6/pic_4.png", "/textures/stage6/board_1999.png", "/textures/stage6/board_2001_1.png", "/textures/stage6/logo_22.png", "/textures/stage6/board_1997.png", "/textures/stage6/board_1998_1.png", "/textures/stage6/pic_5.png", "/stage_3d.jpg"],
   isAndroid: navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1,
   loadImgStatus: !1,
   loadImgCount: 0,
   srcPerfix: "https://img4.cache.netease.com/f2e/wap/demo/xzh5test/src",
   fontWidth: 35,
   fontHeight: 36,
   fontTiming: 500,
   Player3D: function() {
      function e() {
         d.$stage[0].style.display = "block", n = document.querySelectorAll(".nian-3d")[0], o = new THREE.PerspectiveCamera(45, 750 / window.innerHeight, 1, 2e3), o.position.z = 2e3, o.position.x = 200, o.position.y = -200, s = new THREE.Scene;
         var e = new THREE.AmbientLight(13421772);
         s.add(e);
         var t = new THREE.DirectionalLight(16777215);
         t.position.set(200, 50, 200), s.add(t);
         var r = new THREE.LoadingManager;
         r.onProgress = function(e, t, r) {};
         var a = function(e) {
               if (e.lengthComputable) {
                  e.loaded / e.total * 100
               }
            },
            g = function(e) {},
            c = new THREE.OBJLoader(r);
         c.load("https://img2.cache.netease.com/f2e/wap/demo/xz/nian.js", function(e) {
            var t = new THREE.LineBasicMaterial({
               color: 12303291,
               linewidth: 1,
               linecap: "round",
               linejoin: "round"
            }),
               r = new THREE.MeshLambertMaterial({
                  color: 16777215
               });
            e.traverse(function(e) {
               e instanceof THREE.Mesh ? e.material = r : e instanceof THREE.LineSegments && (e.material = t)
            }), e.position.y = -25, e.scale.x = e.scale.y = e.scale.z = .5, l = e, s.add(l)
         }, a, g), i = new THREE.WebGLRenderer({
            alpha: !0
         }), i.setPixelRatio(window.devicePixelRatio), i.setSize(750, window.innerHeight), n.appendChild(i.domElement)
      }
      function t() {
         d.stopNian || (g = requestAnimationFrame(t)), a()
      }
      function r(e, t, r) {
         var a = !1;
         a = r > 0 ? o.position.z < r : o.position.z > -r, a && (o.position.z = o.position.z + 10 * (1 - 2 / e) * t), r > 0 && o.position.z > 2500 && (d.speed3d = !1, d.stopNian = !0, cancelAnimationFrame(g), app.stage1(), setTimeout(function() {
            i = null, ambient = null, loader = null, s = null, o = null
         }, 1e3))
      }
      function a() {
         c++, d.stopNian ? i.clear() : (d.speed3d ? (u++, p > 0 && (p = 250 * (1 - u * u / 1e4 / 3.5)), r(c, 1, 4e3)) : d.speed3d || (u = 0, p = 250, r(c, -1, -400)), l && (l.rotation.y = c * Math.PI / p - Math.PI / 2), o.lookAt({
            x: 0,
            y: 0,
            z: 0
         }), i.render(s, o))
      }
      var n, o, s, i, g, l, c = 0,
         u = 0,
         p = 250,
         d = this;
      e(), t()
   },
   Player2D: function() {
      function e() {
         var e, r = !1;
         n.addEventListener("touchstart", function(a) {
            a.preventDefault(), t.speed3d = !0, e = setTimeout(function() {
               t.stageLevel = 1, r = !0
            }, 1e3)
         }), n.addEventListener("touchend", function(a) {
            a.preventDefault(), r || (t.speed3d = !1, clearTimeout(e))
         })
      }
      var t = this,
         r = new TimelineLite,
         a = t.$stage[0].querySelectorAll(".title-0")[0],
         n = t.$stage[0].querySelectorAll(".fingerprint")[0];
      r.to(a, 4, {
         opacity: 1
      }).to(n, 2, {
         opacity: 1
      }), app.Player3D(), e()
   },
   stage0End: function() {
      var e = this,
         t = new TimelineLite,
         r = e.$stage[0].querySelectorAll(".title-0")[0],
         a = e.$stage[0].querySelectorAll(".fingerprint")[0];
      t.to(r, 2, {
         opacity: 0
      }).to(a, 1, {
         opacity: 0
      })
   },
   stage1: function() {
      function e() {
         a.destory(0), a.stageShow(1), h.className += " twinkle"
      }
      function t(e, t) {
         for (var n = new TimelineLite, o = 0; o < t; o++) d.appendChild(document.createElement("span"));
         n.set(d, {
            width: a.fontWidth * t,
            height: a.fontHeight
         }).set(d.querySelectorAll("span"), {
            backgroundImage: "url(" + e + ")",
            width: a.fontWidth,
            height: a.fontHeight
         }).staggerTo(d.querySelectorAll("span"), a.fontTiming / 1e3, {
            opacity: 1
         }, "0.25"), i.to(x, 3, {
            opacity: 1,
            onComplete: function() {
               r()
            },
            ease: Power1.easeIn
         }).to(y, 2, {
            opacity: 1
         }).to(d, 1, {
            opacity: 0,
            delay: a.stageAniChangeTimes
         }).to(x, 2, {
            opacity: 0,
            onComplete: function() {
               app.stage2(), a.stopSnow = !0;
               var e = document.getElementById("snow");
               e.parentNode.removeChild(e)
            }
         })
      }
      function r() {
         function e() {
            !a.stopSnow && window.requestAnimationFrame(e), w.clearRect(0, 0, m, z), w.fillRect(0, 0, m, z), w.fill();
            for (var t = 0; t < n.length; ++t) f = n[t], f.t += .05, f.t = f.t >= 2 * Math.PI ? 0 : f.t, f.y += f.sp, f.x += Math.sin(f.t * s) * (.3 * f.sz), f.y > z + 50 && (f.y = -10 - Math.random() * l), f.x > m + l && (f.x = -l), f.x < -l && (f.x = m + l), f.draw()
         }
         function t() {
            this.draw = function() {
               this.g = w.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz), this.g.addColorStop(0, "hsla(255,255%,255%,1)"), this.g.addColorStop(1, "hsla(255,255%,255%,0)"), w.moveTo(this.x, this.y), w.fillStyle = this.g, w.beginPath(), w.arc(this.x, this.y, this.sz, 0, 2 * Math.PI, !0), w.fill()
            }
         }
         for (var r, n = [], o = 100, s = 1, i = 1, g = 1.3, l = 20, c = 1, u = 0; u < o; ++u) r = new t, r.y = Math.random() * (z + 50), r.x = Math.random() * m, r.t = Math.random() * (2 * Math.PI), r.sz = 50 / (10 + 50 * Math.random()) * g, r.sp = .15 * Math.pow(.8 * r.sz, 2) * i, r.sp = r.sp < c ? c : r.sp, n.push(r);
         e()
      }
      var a = this,
         n = 0,
         o = !1,
         s = new TimelineLite,
         i = new TimelineLite,
         g = new TimelineLite,
         l = a.$stage[1].querySelectorAll(".text-area-wrap")[0],
         c = a.$stage[1].querySelectorAll(".line-0")[0],
         u = a.$stage[1].querySelectorAll(".info-0")[0],
         p = a.$stage[1].querySelectorAll(".info-1")[0],
         d = a.$stage[1].querySelectorAll(".info-title")[0],
         x = a.$stage[1].querySelectorAll(".animation-area")[0],
         y = a.$stage[1].querySelectorAll("#snow")[0],
         h = a.$stage[1].querySelectorAll(".dot")[0];
      l.addEventListener("touchstart", function(e) {
         h.className = h.className.split(" ")[0]
      }), l.addEventListener("touchmove", function(e) {
         e.preventDefault(), n++, o || (n < 67 ? c.style.width = 6 * n + "px" : (o = !0, t(a.srcPerfix + a.bgGroup[6], 12)))
      }), e(), s.to(l, 2, {
         opacity: 1,
         onComplete: function() {}
      }).to(p, 2, {
         opacity: 1
      }), g.to(u, 2, {
         opacity: 1,
         onComplete: function() {
            TweenMax.set(this.target, {
               className: "+=twinkle"
            })
         }
      }, 1);
      var _ = document.getElementById("snow"),
         w = _.getContext("2d"),
         m = _.width = 750,
         z = _.height = 500
   },
   stage2: function() {
      function e() {
         h.className += " twinkle dot-1", TweenMax.to(d.children[1], 1, {
            opacity: 0,
            onComplete: function(e) {
               d.children[1].className += " on", TweenMax.to(d.children[1], 1, {
                  opacity: 1
               })
            }
         })
      }
      function t(e, t) {
         for (var a = new TimelineLite; x.hasChildNodes();) x.removeChild(x.firstChild);
         for (var n = 0; n < t; n++) x.appendChild(document.createElement("span"));
         a.set(x, {
            width: r.fontWidth * t,
            height: r.fontHeight,
            opacity: 1
         }).set(x.querySelectorAll("span"), {
            backgroundImage: "url(" + e + ")",
            width: r.fontWidth,
            height: r.fontHeight
         }).staggerTo(x.querySelectorAll("span"), r.fontTiming / 1e3, {
            opacity: 1
         }, "0.25"), s.to(u, 1, {
            opacity: 1
         }).to(y, 3, {
            opacity: 1,
            ease: Power1.easeIn
         }).to(x, 1, {
            opacity: 0,
            delay: r.stageAniChangeTimes
         }).to(y, 2, {
            opacity: 0,
            onComplete: function() {
               app.stage3()
            }
         })
      }
      var r = this,
         a = 0,
         n = !1,
         o = new TimelineLite,
         s = new TimelineLite,
         i = new TimelineLite,
         g = new TimelineLite,
         l = r.$stage[1].querySelectorAll(".text-area-wrap")[0],
         c = r.$stage[1].querySelectorAll(".line-1")[0],
         u = r.$stage[1].querySelectorAll(".line-fix-0")[0],
         p = r.$stage[1].querySelectorAll(".info-0")[0],
         d = r.$stage[1].querySelectorAll(".info-1")[0],
         x = r.$stage[1].querySelectorAll(".info-title")[0],
         y = r.$stage[1].querySelectorAll(".animation-area")[1],
         h = r.$stage[1].querySelectorAll(".dot")[0];
      l.addEventListener("touchstart", function(e) {
         h.className = h.className.split(" ")[0]
      }), l.addEventListener("touchmove", function(e) {
         e.preventDefault(), a++, n || (a < 40 ? c.style.height = 6 * a + "px" : (n = !0, t(r.srcPerfix + r.bgGroup[7], 12)))
      }), e(), o.to(l, 2, {
         opacity: 1
      }).to(d, 2, {
         opacity: 1
      }), i.to(p, 2, {
         opacity: 1,
         onComplete: function() {
            TweenMax.set(this.target, {
               className: "+=twinkle"
            })
         }
      }, 1), g.to(p, 2, {
         opacity: 0
      }).to(p, 1, {
         background: "url(" + r.srcPerfix + r.bgGroup[1] + ")"
      }).to(p, 2, {
         opacity: 1
      })
   },
   stage3: function() {
      function e() {
         E.className += " twinkle dot-2", TweenMax.to(x.children[2], 1, {
            opacity: 0,
            onComplete: function(e) {
               x.children[2].className += " on", TweenMax.to(x.children[2], 1, {
                  opacity: 1
               })
            }
         })
      }
      function t(e, t) {
         for (var a = new TimelineLite; y.hasChildNodes();) y.removeChild(y.firstChild);
         for (var n = 0; n < t; n++) y.appendChild(document.createElement("span"));
         a.set(y, {
            width: r.fontWidth * t,
            height: r.fontHeight,
            opacity: 1
         }).set(y.querySelectorAll("span"), {
            backgroundImage: "url(" + e + ")",
            width: r.fontWidth,
            height: r.fontHeight
         }).staggerTo(y.querySelectorAll("span"), r.fontTiming / 1e3, {
            opacity: 1
         }, "0.25"), s.to(u, 1, {
            opacity: 1
         }).to(p, 3, {
            opacity: 1,
            ease: Power1.easeIn
         }).to(y, 1, {
            opacity: 0,
            delay: r.stageAniChangeTimes
         }).to(p, 2, {
            opacity: 0,
            onComplete: function() {
               app.stage4()
            }
         })
      }
      var r = this,
         a = 0,
         n = !1,
         o = new TimelineLite,
         s = new TimelineLite,
         i = new TimelineLite,
         g = new TimelineLite,
         l = r.$stage[1].querySelectorAll(".text-area-wrap")[0],
         c = r.$stage[1].querySelectorAll(".line-2")[0],
         u = r.$stage[1].querySelectorAll(".line-fix-1")[0],
         p = r.$stage[1].querySelectorAll(".animation-area")[2],
         d = r.$stage[1].querySelectorAll(".info-0")[0],
         x = r.$stage[1].querySelectorAll(".info-1")[0],
         y = r.$stage[1].querySelectorAll(".info-title")[0],
         h = p.querySelectorAll(".leaf-0")[0],
         f = p.querySelectorAll(".leaf-1")[0],
         _ = p.querySelectorAll(".leaf-2")[0],
         w = p.querySelectorAll(".leaf-3")[0],
         m = p.querySelectorAll(".leaf-4")[0],
         z = p.querySelectorAll(".leaf-5")[0],
         v = p.querySelectorAll(".leaf-6")[0],
         T = p.querySelectorAll(".leaf-7")[0],
         E = r.$stage[1].querySelectorAll(".dot")[0];
      l.addEventListener("touchstart", function(e) {
         E.className = E.className.split(" ")[0]
      }), l.addEventListener("touchmove", function(e) {
         e.preventDefault(), a++, n || (a < 60 ? c.style.height = 8 * a + "px" : (n = !0, t(r.srcPerfix + r.bgGroup[8], 14)))
      }), e(), o.to(l, 2, {
         opacity: 1,
         onComplete: function() {}
      }).to(x, 2, {
         opacity: 1
      }), i.to(d, 2, {
         opacity: 1,
         onComplete: function() {
            TweenMax.set(this.target, {
               className: "+=twinkle"
            })
         }
      }, 1), g.to(d, 2, {
         opacity: 0
      }).set(d, {
         background: "url(" + r.srcPerfix + r.bgGroup[2] + ")"
      }).to(d, 2, {
         opacity: 1
      });
      var P = [{
         x: -20,
         y: -20
      }, {
         x: 300,
         y: 30
      }, {
         x: 150,
         y: -50
      }, {
         x: 300,
         y: 160
      }, {
         x: 800,
         y: 190
      }],
         b = [{
            x: -20,
            y: -20
         }, {
            x: 250,
            y: 60
         }, {
            x: 100,
            y: -60
         }, {
            x: 340,
            y: 100
         }, {
            x: 800,
            y: 200
         }],
         S = [{
            x: -20,
            y: -20
         }, {
            x: 320,
            y: 40
         }, {
            x: 160,
            y: -20
         }, {
            x: 320,
            y: 120
         }, {
            x: 800,
            y: 0
         }];
      TweenMax.to(h, 8, {
         bezier: {
            values: P,
            curviness: 1,
            autoRotate: !0
         },
         ease: Power1.easeInOut,
         repeat: -1,
         delay: 1
      }), TweenMax.to(f, 8, {
         bezier: {
            values: P,
            curviness: 1,
            autoRotate: !0
         },
         ease: Power1.easeInOut,
         repeat: -1,
         delay: 2.5
      }), TweenMax.to(_, 8, {
         bezier: {
            values: b,
            curviness: 1,
            autoRotate: !0
         },
         ease: Power1.easeInOut,
         repeat: -1,
         delay: 1.5
      }), TweenMax.to(w, 8, {
         bezier: {
            values: P,
            curviness: 1,
            autoRotate: !0
         },
         ease: Power1.easeInOut,
         repeat: -1,
         delay: 1.8
      }), TweenMax.to(m, 8, {
         bezier: {
            values: S,
            curviness: 1,
            autoRotate: !0
         },
         ease: Power1.easeInOut,
         repeat: -1,
         delay: 1.2
      }), TweenMax.to(z, 8, {
         bezier: {
            values: P,
            curviness: 1,
            autoRotate: !0
         },
         ease: Power1.easeInOut,
         repeat: -1,
         delay: .5
      }), TweenMax.to(v, 8.5, {
         bezier: {
            values: S,
            curviness: 1,
            autoRotate: !0
         },
         ease: Power1.easeInOut,
         repeat: -1,
         delay: .8
      }), TweenMax.to(T, 8, {
         bezier: {
            values: b,
            curviness: 1,
            autoRotate: !0
         },
         ease: Power1.easeInOut,
         repeat: -1,
         delay: 2.1
      })
   },
   stage4: function() {
      function e() {
         h.className += " twinkle dot-3", TweenMax.to(x.children[3], 1, {
            opacity: 0,
            onComplete: function(e) {
               x.children[3].className += " on", TweenMax.to(x.children[3], 1, {
                  opacity: 1
               })
            }
         })
      }
      function t(e, t) {
         for (var a = new TimelineLite; y.hasChildNodes();) y.removeChild(y.firstChild);
         for (var n = 0; n < t; n++) y.appendChild(document.createElement("span"));
         a.set(y, {
            width: r.fontWidth * t,
            height: r.fontHeight,
            opacity: 1
         }).set(y.querySelectorAll("span"), {
            backgroundImage: "url(" + e + ")",
            width: r.fontWidth,
            height: r.fontHeight
         }).staggerTo(y.querySelectorAll("span"), r.fontTiming / 1e3, {
            opacity: 1
         }, "0.25"), s.to(u, 1, {
            opacity: 1
         }).to(p, 3, {
            opacity: 1,
            ease: Power1.easeIn
         }).to(y, 1, {
            opacity: 0,
            delay: r.stageAniChangeTimes
         }).to(p, 2, {
            opacity: 0,
            onComplete: function() {
               app.stage5()
            }
         })
      }
      var r = this,
         a = 0,
         n = !1,
         o = new TimelineLite,
         s = new TimelineLite,
         i = new TimelineLite,
         g = new TimelineLite,
         l = r.$stage[1].querySelectorAll(".text-area-wrap")[0],
         c = r.$stage[1].querySelectorAll(".line-3")[0],
         u = r.$stage[1].querySelectorAll(".line-fix-2")[0],
         p = r.$stage[1].querySelectorAll(".animation-area")[3],
         d = r.$stage[1].querySelectorAll(".info-0")[0],
         x = r.$stage[1].querySelectorAll(".info-1")[0],
         y = r.$stage[1].querySelectorAll(".info-title")[0],
         h = r.$stage[1].querySelectorAll(".dot")[0];
      l.addEventListener("touchstart", function(e) {
         h.className = h.className.split(" ")[0]
      }), l.addEventListener("touchmove", function(e) {
         e.preventDefault(), a++, n || (a < 30 ? c.style.width = 6 * a + "px" : (n = !0, t(r.srcPerfix + r.bgGroup[9], 12)))
      }), e(), o.to(l, 2, {
         opacity: 1,
         onComplete: function() {}
      }).to(x, 2, {
         opacity: 1
      }), i.to(d, 2, {
         opacity: 1,
         onComplete: function() {
            TweenMax.set(this.target, {
               className: "+=twinkle"
            })
         }
      }, 1), g.to(d, 2, {
         opacity: 0
      }).set(d, {
         background: "url(" + r.srcPerfix + r.bgGroup[3] + ")"
      }).to(d, 2, {
         opacity: 1
      })
   },
   stage5: function() {
      var e = this,
         t = new TimelineLite,
         r = (new TimelineLite, new TimelineLite),
         a = (new TimelineLite, e.$stage[2].querySelectorAll(".text-area-wrap")[0]),
         n = e.$stage[2].querySelectorAll(".title-0")[0],
         o = e.$stage[2].querySelectorAll(".title-1")[0],
         s = e.$stage[2].querySelectorAll(".title-2")[0],
         i = e.$stage[2].querySelectorAll(".nian-2d")[0];
      t.to(e.$stage[1], 1, {
         opacity: 0
      }).to(a, 1, {
         opacity: 0
      }).to(i, 2, {
         y: -380
      }).to(i, 4, {
         scale: 10,
         opacity: 0,
         delay: 4
      }), r.set(e.$stage[2], {
         display: "block"
      }).to(e.$stage[2], 1, {
         opacity: 1
      }).to(o, 2, {
         opacity: 1,
         delay: 2
      }).to(s, 1, {
         opacity: 1
      }).to(n, 1, {
         opacity: 1
      }).to(o, 1, {
         opacity: 0
      }).to(s, 1, {
         opacity: 0
      }).to(n, 1, {
         opacity: 0,
         onComplete: function() {
            setTimeout(function() {
               e.stageShow(3), e.panorama()
            }, 1e3)
         }
      })
   },
   panorama: function() {
      function e() {
         function e() {
            var e = document.createElement("canvas");
            e.width = 16, e.height = 16;
            var t = e.getContext("2d"),
               r = t.createRadialGradient(e.width / 2, e.height / 2, 0, e.width / 2, e.height / 2, e.width / 2);
            return r.addColorStop(0, "rgba(255,255,255,1)"), r.addColorStop(.2, "rgba(0,255,255,1)"), r.addColorStop(.4, "rgba(0,0,64,1)"), r.addColorStop(1, "rgba(0,0,0,1)"), t.fillStyle = r, t.fillRect(0, 0, e.width, e.height), e
         }
         function t(e, r) {
            var e = this instanceof THREE.Sprite ? this : e,
               r = void 0 !== r ? r : 0;
            e.position.set(0, 0, 60), e.scale.x = e.scale.y = 2 * Math.random() + 1, new TWEEN.Tween(e).delay(r).to({}, 1e4).onComplete(t).start(), new TWEEN.Tween(e.position).delay(r).to({
               x: 4e3 * Math.random() - 2e3,
               y: 1e3 * Math.random() - 500,
               z: 4e3 * Math.random() - 2e3
            }, 1e4).start(), new TWEEN.Tween(e.scale).delay(r).to({
               x: .01,
               y: .01
            }, 1e4).start()
         }
         function r() {
            a({
               src: f.srcPerfix + "/textures/stage6/logo_0.png",
               id: 0,
               w: 30,
               h: 10,
               x: 0,
               y: 0,
               z: -80,
               rx: 0,
               ry: 0,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2006.png",
               id: 1,
               w: 16,
               h: 8,
               x: 0,
               y: 15,
               z: -85,
               rx: 0,
               ry: 0,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_3.png",
               id: 2,
               w: 6,
               h: 6,
               x: 12,
               y: 14,
               z: -85,
               rx: 0,
               ry: 0,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2009.png",
               id: 3,
               w: 16,
               h: 8,
               x: -30,
               y: -2,
               z: -70,
               rx: 0,
               ry: 20,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2010.png",
               id: 4,
               w: 32,
               h: 13,
               x: -32,
               y: 12,
               z: -80,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_5.png",
               id: 5,
               w: 5,
               h: 5,
               x: -53,
               y: 13,
               z: -75,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2011.png",
               id: 6,
               w: 20,
               h: 13,
               x: -53,
               y: 0,
               z: -65,
               rx: 0,
               ry: 40,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_7.png",
               id: 7,
               w: 5,
               h: 5,
               x: -60,
               y: -9.5,
               z: -65,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_8.png",
               id: 8,
               w: 5,
               h: 5,
               x: -52,
               y: -9,
               z: -65,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_29.png",
               id: 9,
               w: 5,
               h: 5,
               x: -44,
               y: -8.5,
               z: -65,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_30.png",
               id: 10,
               w: 17.5,
               h: 5,
               x: -52,
               y: -15,
               z: -65,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2013.png",
               id: 11,
               w: 19,
               h: 11,
               x: -70,
               y: 10,
               z: -55,
               rx: 0,
               ry: 45,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_9.png",
               id: 12,
               w: 5,
               h: 5,
               x: -69,
               y: 1.5,
               z: -52,
               rx: 0,
               ry: 40,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_10.png",
               id: 13,
               w: 5,
               h: 5,
               x: -60,
               y: 1.5,
               z: -52,
               rx: 0,
               ry: 40,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2015_1.png",
               id: 14,
               w: 20,
               h: 15,
               x: -80,
               y: 0,
               z: -30,
               rx: 0,
               ry: 80,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_27.png",
               id: 15,
               w: 5,
               h: 5,
               x: -80,
               y: -11,
               z: -24,
               rx: 0,
               ry: 80,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_13.png",
               id: 16,
               w: 5,
               h: 5,
               x: -80,
               y: -11,
               z: -30,
               rx: 0,
               ry: 80,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_25.png",
               id: 17,
               w: 5,
               h: 5,
               x: -80,
               y: -11,
               z: -36,
               rx: 0,
               ry: 80,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_26.png",
               id: 18,
               w: 15,
               h: 5,
               x: -80,
               y: -17,
               z: -30,
               rx: 0,
               ry: 80,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2016_1.png",
               id: 19,
               w: 27,
               h: 19,
               x: -85,
               y: 0,
               z: 0,
               rx: 0,
               ry: 90,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_15.png",
               id: 20,
               w: 5,
               h: 5,
               x: -85,
               y: -13,
               z: 9,
               rx: 0,
               ry: 90,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_1.png",
               id: 21,
               w: 4.8,
               h: 4.8,
               x: -79,
               y: -12,
               z: 2,
               rx: 0,
               ry: 90,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_24.png",
               id: 22,
               w: 4.5,
               h: 4.5,
               x: -73,
               y: -11,
               z: -4,
               rx: 0,
               ry: 90,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_14.png",
               id: 23,
               w: 4.2,
               h: 4.2,
               x: -67,
               y: -10,
               z: -9,
               rx: 0,
               ry: 90,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2017.png",
               id: 24,
               w: 19,
               h: 8,
               x: -85,
               y: 18,
               z: 25,
               rx: 0,
               ry: 100,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_23.png",
               id: 25,
               w: 8,
               h: 8,
               x: -85,
               y: 10,
               z: 25,
               rx: 0,
               ry: 100,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_28.png",
               id: 26,
               w: 5,
               h: 5,
               x: -80,
               y: 13,
               z: -10,
               rx: 0,
               ry: 90,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2012.png",
               id: 27,
               w: 25,
               h: 8,
               x: -35,
               y: -18,
               z: -65,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_16.png",
               id: 28,
               w: 9,
               h: 5,
               x: -30,
               y: -24.5,
               z: -65,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_17.png",
               id: 29,
               w: 6,
               h: 5,
               x: -40,
               y: -27,
               z: -65,
               rx: 0,
               ry: 30,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2008.png",
               id: 30,
               w: 19,
               h: 8,
               x: -12,
               y: -15,
               z: -80,
               rx: 0,
               ry: 5,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_18.png",
               id: 31,
               w: 11,
               h: 6,
               x: -12,
               y: -23,
               z: -80,
               rx: 0,
               ry: 5,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2007.png",
               id: 32,
               w: 22,
               h: 8,
               x: 10,
               y: -16,
               z: -80,
               rx: 0,
               ry: -3,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_19.png",
               id: 33,
               w: 6,
               h: 6,
               x: 7,
               y: -24,
               z: -80,
               rx: 0,
               ry: -3,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_20.png",
               id: 34,
               w: 6,
               h: 6,
               x: 14,
               y: -24,
               z: -80,
               rx: 0,
               ry: -3,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2003.png",
               id: 35,
               w: 20,
               h: 8,
               x: 30,
               y: 10,
               z: -70,
               rx: 0,
               ry: -5,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_21.png",
               id: 36,
               w: 9,
               h: 6,
               x: 30,
               y: 2,
               z: -70,
               rx: 0,
               ry: -5,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2004.png",
               id: 37,
               w: 20,
               h: 8,
               x: 32,
               y: -8,
               z: -70,
               rx: 0,
               ry: -4,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_31.png",
               id: 38,
               w: 15.6,
               h: 6,
               x: 32,
               y: -16,
               z: -70,
               rx: 0,
               ry: -4,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2002_1.png",
               id: 39,
               w: 21,
               h: 8,
               x: 45,
               y: 2,
               z: -60,
               rx: 0,
               ry: -20,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_33.png",
               id: 40,
               w: 20,
               h: 7,
               x: 48,
               y: -5,
               z: -60,
               rx: 0,
               ry: -20,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_32.png",
               id: 40,
               w: 20,
               h: 7,
               x: 48,
               y: -11,
               z: -60,
               rx: 0,
               ry: -20,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2000_1.png",
               id: 41,
               w: 28,
               h: 12,
               x: 75,
               y: -18,
               z: -50,
               rx: 0,
               ry: -50,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/pic_4.png",
               id: 42,
               w: 14,
               h: 4,
               x: 42,
               y: -15,
               z: -50,
               rx: 0,
               ry: -35,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_1999.png",
               id: 43,
               w: 24,
               h: 8,
               x: 68,
               y: -5,
               z: -50,
               rx: 0,
               ry: -50,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_2001_1.png",
               id: 44,
               w: 17,
               h: 7,
               x: 50,
               y: 5,
               z: -30,
               rx: 0,
               ry: -50,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/logo_22.png",
               id: 45,
               w: 14,
               h: 5,
               x: 80,
               y: 5,
               z: -25,
               rx: 0,
               ry: -90,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_1997.png",
               id: 46,
               w: 18,
               h: 15,
               x: 75,
               y: 0,
               z: -5,
               rx: 0,
               ry: -90,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/board_1998_1.png",
               id: 47,
               w: 20,
               h: 8,
               x: 80,
               y: -5,
               z: -30,
               rx: 0,
               ry: -80,
               rz: 0
            }), a({
               src: f.srcPerfix + "/textures/stage6/pic_5.png",
               id: 48,
               w: 9,
               h: 9,
               x: 80,
               y: -15,
               z: -30,
               rx: 0,
               ry: -80,
               rz: 0
            })
         }
         function a(e) {
            z.load(e.src, function(t) {
               var r = .4 * Math.random() + .6;
               c[e.id] = new THREE.Texture, c[e.id].image = t, c[e.id].needsUpdate = !0;
               var a = new THREE.PlaneGeometry(e.w * r, e.h * r, 1),
                  n = new THREE.MeshBasicMaterial({
                     map: c[e.id],
                     transparent: !0
                  }),
                  o = new THREE.Mesh(a, n);
               o.position.x = e.x * r, o.position.y = e.y * r, o.position.z = e.z * r, o.rotation.x = e.rx ? THREE.Math.degToRad(e.rx) : 0, o.rotation.y = e.ry ? THREE.Math.degToRad(e.ry) : 0, o.rotation.z = e.rz ? THREE.Math.degToRad(e.rz) : 0, u[e.id] = o, i.add(u[e.id])
            })
         }
         f.destory(1), f.destory(2), o = document.querySelectorAll(".history")[0], s = new THREE.PerspectiveCamera(45, 750 / window.innerHeight, 1, 2e3), s.position.z = 0, s.position.x = 0, s.position.y = 0, i = new THREE.Scene;
         var n = new THREE.AmbientLight(16777215);
         i.add(n);
         var l = new THREE.LoadingManager;
         l.onProgress = function(e, t, r) {};
         var c = [],
            y = function(e) {
               if (e.lengthComputable) {
                  e.loaded / e.total * 100
               }
            },
            w = function(e) {},
            m = new THREE.JSONLoader(l);
         m.setTexturePath = "https://img3.cache.netease.com/f2e/wap/demo/xz/", m.crossOrigin = "anonymous";
         var z = new THREE.ImageLoader(l);
         z.crossOrigin = "anonymous";
         var v = new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(e()),
            blending: THREE.AdditiveBlending
         });
         m.load("https://img2.cache.netease.com/f2e/wap/demo/xz/ling.js", function(e, a) {
            var n = a[0],
               o = new THREE.Mesh(e, n);
            _ = o, i.add(_), r();
            for (var s = 0; s < 500; s++) particle = new THREE.Sprite(v), t(particle, 30 * s), i.add(particle)
         }, y, w), g = new THREE.WebGLRenderer({}), g.setPixelRatio(window.devicePixelRatio), g.setSize(750, window.innerHeight), o.appendChild(g.domElement), document.addEventListener("touchstart", function(e) {
            p = e.touches[0].screenX, d = e.touches[0].screenY, h = x
         }), document.addEventListener("touchend", function(e) {
            h = x
         }), document.addEventListener("touchmove", function(e) {
            e.preventDefault(), x = h - 1.5 * (p - e.touches[0].screenX)
         })
      }
      function t(e, t) {
         s.position.x = w * Math.sin(THREE.Math.degToRad(e / 10)), s.position.y = w * Math.sin(THREE.Math.degToRad(t / 10)), s.position.z = w * Math.cos(THREE.Math.degToRad(e / 10))
      }
      function r(e) {
         var t = e.rotationRate,
            r = (t.alpha ? THREE.Math.degToRad(t.alpha) : 0, t.beta ? THREE.Math.degToRad(t.beta) : 0);
         t.gamma ? THREE.Math.degToRad(t.gamma) : 0;
         x += r * (f.isAndroid ? 500 : 10)
      }
      function a() {
         l = requestAnimationFrame(a), n()
      }
      function n() {
         c++, TWEEN.update(), t(x, y), s.lookAt(i.position), g.render(i, s)
      }
      var o, s, i, g, l, c = 0,
         u = [],
         p = 0,
         d = 0,
         x = 0,
         y = 0,
         h = 0,
         f = this,
         _ = null,
         w = 10;
      e(), a(), window.DeviceMotionEvent ? window.addEventListener("devicemotion", r, !1) : window.DeviceOrientationEvent && window.addEventListener("deviceorientation", orientationHandler, !1)
   },
   stageShow: function(e) {
      this.$stage[e].style.display = "block", e > 1 && (this.$stage[e - 1].style.display = "none")
   },
   destory: function(e) {
      this.$stage[e].parentNode.removeChild(this.$stage[e])
   },
   imgLoading: function() {
      function e() {
         t.loadImgCount == t.bgGroup.length ? (console.log("loading success"), r.innerText = "100%", r.className += " hideIn", app.Player2D()) : r.innerText = parseInt(100 * t.loadImgCount / t.bgGroup.length) + "%"
      }
      var t = this,
         r = document.querySelectorAll(".loading")[0];
      this.bgGroup.forEach(function(r) {
         var a = new Image;
         a.src = t.srcPerfix + r, a.onload = function(r) {
            t.loadImgCount++, e()
         }, a.onerror = function(r) {
            t.loadImgCount++, e()
         }
      })
   },
   musicController: function() {
      function e() {
         var e = function() {
               t.$musicPlayer.play(), document.removeEventListener("touchstart", e, !1)
            };
         document.addEventListener("touchstart", e, !1)
      }
      var t = this;
      this.$musicBtn.addEventListener("touchstart", function(e) {
         e.preventDefault(), t.$musicPlayer.paused ? (t.$musicBtn.className += " on", t.$musicPlayer.play()) : (t.$musicBtn.className = t.$musicBtn.className.split(" ")[0], t.$musicPlayer.pause())
      }), e()
   }
};
Object.defineProperty(app, "stageLevel", {
   set: function(e) {
      1 === e && app.stage0End()
   },
   get: function() {
      return this.stageLevel
   }
}), app.imgLoading(), app.musicController(), window.ontouchstart = function(e) {
   e.preventDefault()
};